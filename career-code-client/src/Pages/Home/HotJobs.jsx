import React, { use } from "react";
import JobCard from "./JobCard";

const HotJobs = ({ jobsPromise }) => {
  const jobs = use(jobsPromise);
  return (
    <div className="my-20">
      <h1 className="mb-8 text-center">Hot Jobs of The Day</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard job={job}></JobCard>
        ))}
      </div>
    </div>
  );
};

export default HotJobs;
