import React, { use } from "react";
import { Link } from "react-router";

const MyJobList = ({ jobsCreatedByPromise }) => {
  const myJobs = use(jobsCreatedByPromise);
  console.log(myJobs.length);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Job Title</th>
            <th>Deadline</th>
            <th>Count</th>
            <th>View Application</th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {myJobs.map((myJob, index) => (
            <tr key={myJob._id}>
              <th>{index + 1}</th>
              <td>{myJob.job_title}</td>
              <td>{myJob.deadline}</td>
              <td>{myJob.application_count}</td>
              <td>
                <Link
                  className="button hover:shadow-lg"
                  to={`/applications/${myJob._id}`}
                >
                  View Applications
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyJobList;
