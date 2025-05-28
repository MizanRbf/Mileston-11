import React from "react";
import { useLocation } from "react-router";

const MyJobs = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <h1>My jobs</h1>
    </div>
  );
};

export default MyJobs;
