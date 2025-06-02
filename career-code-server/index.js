require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middleware
app.use(cors({
  origin:['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Firebase Admin Setup
var admin = require("./firebase-admin-key.json");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const logger = (req, res, next)=>{
  console.log("logger is using");
  next();
}
// Verify Token
const verifyToken = (req,res,next)=>{
  const token = req?.cookies?.token;
  console.log('cookie in the middleware',token);

  if(!token){
    return res.status(401).send({message: 'unauthorized access'})
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
  if(err){
   return res.status(401).send({message: 'unauthorized access'})
  }
  req.decoded = decoded;
  next();
  })
}

// Verify Firebase accessToken
const verifyFirebaseToken = async(req,res,next)=>{
  const authHeader = req.headers?.authorization;
  const token = authHeader.split('')[1];
  if(!token){
    return res.status(401).send({message: 'unauthorized access'})
  }
  const userInfo = await admin.auth().verifyIdToken(token);
  req.tokenEmail = userInfo.email;
  next();
}

// URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hoysa1m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Mongo Client
const client = new MongoClient(uri, {
  serverApi:{
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors:true
  }
});

async function run(){
try{
// await client.connect();
const jobsCollection = client.db("CareerCode").collection('Jobs');
const applicationsCollection = client.db("CareerCode").collection('Applications');



// jwt Related APIs
app.post('/jwt',async(req, res)=>{
  const userData = req.body;
  const token = jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: '1d'});

   // set token in the cookies
res.cookie('token', token, {
  httpOnly: true,
  secure: true
})


  res.send({success: true})
})



// Jobs Related APIs

// Create Operation || POST
app.post('/jobs',async(req, res)=>{
  const newJob = req.body;
  const result = await jobsCollection.insertOne(newJob);
  res.send(result);
})

// Read Operation
app.get('/jobs', async (req,res)=>{
  const email = req.query.email;
  console.log(email)
  const query = {};
  if(email){
    query.hr_email = email;
  }

const cursor = jobsCollection.find(query);
const result = await cursor.toArray();
res.send(result);
})

// Read Count
app.get('/jobs/applications', verifyToken, async(req, res)=>{
  const email = req.query.email;

  // verify email with token
  if(email !== req.decoded.email){
  return res.status(403).send({message: 'forbidden access'})
}
  const query = {hr_email: email};
  const jobs = await jobsCollection.find(query).toArray();

  // should use aggregate to have optimum data fetching
for(const job of jobs){
  const applicationQuery = {jobId: job._id.toString()};
  const application_count = await applicationsCollection.countDocuments(applicationQuery);
  job.application_count = application_count;
}
res.send(jobs);

})

// Read Single
app.get('/jobs/:id', async(req, res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  const result = await jobsCollection.findOne(query);
  res.send(result); 
})



// Applications Related API

// Create
app.post('/applications',async(req,res)=>{
  const application = req.body;
  console.log(application);
  const result = await applicationsCollection.insertOne(application);
  res.send(result);
})

// Read
app.get('/applications', logger, verifyFirebaseToken, async(req, res)=>{
  const email = req.query.email;

// console.log('inside applications api', req.cookies);
 if(req.tokenEmail !== email){
  return res.status(403).send({message: 'forbidden access'})
 }

  const query = {
    applicant: email
  }
  const result = await applicationsCollection.find(query).toArray();

  // bad way to aggregate data
  for(const application of result){
    const jobId = application.jobId;
    const jobQuery = {_id: new ObjectId(jobId)};
    const job = await jobsCollection.findOne(jobQuery);
    application.company = job.company;
    application.title = job.title;
    application.company_logo = job.company_logo;
  }
  res.send(result);
});

// Update || PATCH
app.patch("/applications/:id", async(req, res)=>{
  const id = req.params.id;
  const filter ={_id: new ObjectId(id)};
  const updateDoc = {
    $set: {
      status: req.body.status
    }
  }
  const result = await applicationsCollection.updateOne(filter, updateDoc);
  res.send(result);

})

// Read by params
app.get("/applications/job/:job_id",async(req,res)=>{
  const job_id = req.params.job_id;
  const query = {jobId: job_id};
  const result = await applicationsCollection.find(query).toArray();
  res.send(result);

});



    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
finally{
  // await client.close();
}
}
run().catch(console.dir);

app.get("/",(req, res)=>{
  res.send('Career Code is Cooking')
})

app.listen(port, ()=>{
  console.log(`Career Code server is running on port ${port}`)
})