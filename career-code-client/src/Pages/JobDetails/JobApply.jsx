import React from "react";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const JobApply = () => {
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const { user } = useAuth();
  console.log(jobId, user);

  //Handle Apply Form Submit
  const handleApplyFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const linkedIn = form.linkedIn.value;
    const gitHub = form.gitHub.value;
    const resume = form.resume.value;
    console.log(linkedIn, gitHub, resume);

    const application = {
      jobId,
      applicant: user.email,
      linkedIn,
      gitHub,
      resume,
    };

    // Post
    axios
      .post("http://localhost:3000/applications", application)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        form.reset();
        navigate("/myApplications");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="py-10">
      <h1 className="text-center py-4">Apply for Job</h1>
      <form onSubmit={handleApplyFormSubmit} className="flex justify-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">LinkedIn Link</label>
          <input
            type="url"
            name="linkedIn"
            className="input"
            placeholder="LinkedIn profile link"
          />

          <label className="label">Github Link</label>
          <input
            type="url"
            name="gitHub"
            className="input"
            placeholder="Github Profile Link"
          />

          <label className="label">Resume Link</label>
          <input
            type="url"
            name="resume"
            className="input"
            placeholder="Resume Link"
          />
          <input
            type="submit"
            value="Apply"
            className="button hover:shadow-lg"
          />
        </fieldset>
      </form>
    </div>
  );
};

export default JobApply;
