import React from "react";

const JobCard = ({ job }) => {
  const { title, jobType, category, description, company_logo } = job;
  return (
    <div className="rounded-lg p-4 shadow-lg border border-slate-200">
      <img src={company_logo} alt="" />
      <p>{title}</p>
      <p>{jobType}</p>
      <p>{category}</p>
      <p>{description}</p>
    </div>
  );
};

export default JobCard;
