import React, { use } from "react";
import JobApplicationRow from "./JobApplicatonRow";

const ApplicationList = ({ myApplicationsPromise }) => {
  const myApplications = use(myApplicationsPromise);

  return (
    <div className="mt-10">
      <h1>Job Applied so far: {myApplications.length}</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>No.</label>
                </th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myApplications.map((application, index) => (
                <JobApplicationRow
                  key={myApplications._id}
                  index={index}
                  application={application}
                ></JobApplicationRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;
