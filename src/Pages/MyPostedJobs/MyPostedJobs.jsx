import React, { Suspense } from "react";
import useAuth from "../../Hooks/UseAuth";
import MyJobList from "./myJobList";
import { jobsCreatedByPromise } from "../../APIs/Jobs.api";

const MyPostedJobs = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <h1>My Posted Jobs</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <MyJobList
          jobsCreatedByPromise={jobsCreatedByPromise(user.email)}
        ></MyJobList>
      </Suspense>
    </div>
  );
};

export default MyPostedJobs;
