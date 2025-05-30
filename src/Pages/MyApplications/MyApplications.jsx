import React, { Suspense } from "react";
import { useLocation } from "react-router";
import ApplicationStat from "./ApplicationStat";
import ApplicationList from "./ApplicationList";
import useAuth from "../../Hooks/useAuth";
import { myApplicationsPromise } from "../../APIs/Applications.api";

const MyApplications = () => {
  const { user } = useAuth();
  const location = useLocation();
  console.log(location);
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <h1>My Applications</h1>
      <ApplicationStat></ApplicationStat>
      <Suspense fallback={"Loading Applications..."}>
        <ApplicationList
          myApplicationsPromise={myApplicationsPromise(user.email)}
        ></ApplicationList>
      </Suspense>
    </div>
  );
};

export default MyApplications;
