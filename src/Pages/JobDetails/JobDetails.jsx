import React from "react";
import { Link, useLoaderData } from "react-router";

const JobDetails = () => {
  const job = useLoaderData();

  const { _id, title, jobType, category, description, company_logo } = job;
  return (
    <div className="pt-50 mx-4">
      <div className="max-w-[1200px] mx-auto p-4 space-y-1 border">
        <img src={company_logo} alt="" />
        <h2>{title}</h2>
        <p>{jobType}</p>
        <p>{category}</p>
        <p>{description}</p>
        <Link to={`/jobApply/${_id}`}>
          <button className="button hover:shadow-lg">Apply Now</button>
        </Link>
      </div>
    </div>
  );
};

export default JobDetails;
