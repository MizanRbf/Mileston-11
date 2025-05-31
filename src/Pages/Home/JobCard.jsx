import React from "react";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  const { _id, title, jobType, category, description, company_logo } = job;
  return (
    <div className="rounded-lg p-4 shadow-lg border border-slate-200 space-y-1">
      <img src={company_logo} alt="" />
      <h2>{title}</h2>
      <p>{jobType}</p>
      <p>{category}</p>
      <p>{description}</p>
      <Link to={`/jobs/${_id}`}>
        <button className="button mt-4 hover:shadow-lg">Show Details</button>
      </Link>
    </div>
  );
};

export default JobCard;
