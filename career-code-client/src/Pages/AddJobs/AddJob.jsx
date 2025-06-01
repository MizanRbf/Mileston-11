import React from "react";
import useAuth from "../../Hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";

const AddJob = () => {
  const { user } = useAuth();
  // Handle Add Job
  const handleAddJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // console.log("Form Data:", data);

    // Process Salary range data
    const { min, max, currency, ...newJob } = data;
    newJob.salaryRange = { min, max, currency };

    // Process Requirements
    const requirementsString = newJob.requirements;
    const requirementsDirty = requirementsString.split(",");
    const requirementsClean = requirementsDirty.map((req) => req.trim());
    newJob.requirements = requirementsClean;

    // Process Responsibilities
    newJob.responsibilities = newJob.responsibilities
      .split(",")
      .map((res) => res.trim());

    newJob.status = "active";
    console.log(newJob);

    // save job in the database
    axios
      .post("https://career-code-server-omega.vercel.app/jobs", newJob)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your job has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="max-w-[1200px] mx-auto px-4 pt-30">
      <h1 className="text-center mb-4">Please Add a Job</h1>
      <form onSubmit={handleAddJob} className="flex flex-col items-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
          <legend className="fieldset-legend">Basic Info</legend>
          <label className="label">Job Title</label>
          <input
            type="text"
            name="job_title"
            className="input"
            placeholder="Job Title"
          />

          <label className="label">Company</label>
          <input
            type="text"
            name="company"
            className="input"
            placeholder="Company Name"
          />

          <label className="label">Location</label>
          <input
            type="text"
            className="input"
            name="location"
            placeholder="Company Location"
          />

          <label className="label">Company Logo</label>
          <input
            type="text"
            name="company_logo"
            className="input"
            placeholder="Company Logo URL"
          />
        </fieldset>

        {/*Job Type  */}

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
          <legend className="fieldset-legend">Job Type</legend>
          <div className="filter">
            <input
              className="btn filter-reset"
              type="radio"
              name="jobType"
              aria-label="All"
            />
            <input
              className="btn"
              type="radio"
              name="jobType"
              value="On-Site"
              aria-label="On-Site"
            />
            <input
              className="btn"
              type="radio"
              name="jobType"
              value="Remote"
              aria-label="Remote"
            />
            <input
              className="btn"
              type="radio"
              name="jobType"
              value="Hybrid"
              aria-label="Hybrid"
            />
          </div>
        </fieldset>

        {/* Job Category */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
          <legend className="fieldset-legend">Job Category</legend>
          <select
            defaultValue="Job Category"
            className="select"
            name="category"
          >
            <option disabled={true}>Job Category</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Finance</option>
          </select>
        </fieldset>

        {/* Application Deadline */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
          <legend className="fieldset-legend">Application Deadline</legend>
          <input type="date" name="deadline" className="input" />
        </fieldset>

        {/* Salary Range */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <legend className="fieldset-legend">Salary Range</legend>

          <div>
            <label className="label">Minimum Salary</label>
            <input
              type="text"
              name="min"
              className="input"
              placeholder="Minimum Salary"
            />
          </div>

          <div>
            <label className="label">Maximum Salary</label>
            <input
              type="text"
              name="max"
              className="input"
              placeholder="Maximum Salary"
            />
          </div>
          <div>
            <label className="label">Currency</label>
            <select
              defaultValue="Select a Currency"
              className="select"
              name="currency"
            >
              <option disabled={true}>Select a Currency</option>
              <option>BDT</option>
              <option>USD</option>
              <option>EURO</option>
            </select>
          </div>
        </fieldset>

        {/* Job Description */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
          <legend className="fieldset-legend">Job Description</legend>
          <textarea
            name="description"
            className="textarea"
            placeholder="Job Description"
          ></textarea>
        </fieldset>

        {/* Job Requirements */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
          <legend className="fieldset-legend">Job Requirements</legend>
          <textarea
            name="requirements"
            className="textarea"
            placeholder="Requirements (separate by comma)"
          ></textarea>
        </fieldset>
        {/* Job Responsibilities */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
          <legend className="fieldset-legend">Job Responsibilities</legend>
          <textarea
            name="responsibilities"
            className="textarea"
            placeholder="Responsibilities (separate by comma)"
          ></textarea>
        </fieldset>

        {/*  */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
          <legend className="fieldset-legend">HR Related Info</legend>
          <label className="label">HR Name</label>
          <input
            type="text"
            name="hr_name"
            className="input"
            placeholder="HR Name"
          />

          <label className="label">HR Email</label>
          <input
            type="text"
            name="hr_email"
            defaultValue={user.email}
            className="input"
            placeholder="HR Email"
          />
        </fieldset>

        <input
          type="submit"
          value="Add Job"
          className="button hover:shadow-lg my-3"
        />
      </form>
    </div>
  );
};

export default AddJob;
