import React from "react";

import Banner from "./Banner";
import HotJobs from "./HotJobs";

const jobsPromise = fetch("http://localhost:3000/jobs").then((res) =>
  res.json()
);
const HomePage = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <Banner></Banner>
      <HotJobs jobsPromise={jobsPromise}></HotJobs>
    </div>
  );
};

export default HomePage;
