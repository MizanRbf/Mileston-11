import Lottie from "lottie-react";
import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

const Register = () => {
  const { createUser, updateUser } = use(AuthContext);
  const navigate = useNavigate();
  // Handle Register
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photo, email, password);
    const profile = {
      displayName: name,
      photoURL: photo,
    };

    // Create User
    createUser(email, password)
      .then(() => {
        // Update User
        updateUser(profile)
          .then()
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error.message));
    navigate("/login");
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="text-center">Register Your Account</h2>
        <hr className="my-4 text-[#e5e5e5]" />
        {/* Form */}
        <form onSubmit={handleRegister} className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Enter Your Name"
            required
          />

          {/* Photo URL */}
          <label className="label">Photo URL</label>
          <input
            type="text"
            name="photo"
            className="input"
            placeholder="Enter Your Photo URL"
            required
          />

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Enter Your Email"
            required
          />

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Enter Your Password"
            required
          />

          {/* Accept Terms And Conditions */}
          <label className="label">
            <input type="checkbox" defaultChecked className="checkbox" />
            Accept terms & conditions
          </label>
          <button type="submit" className="btn  mt-4 button">
            Register
          </button>
        </form>
        <p className="text-center">
          Already have and account?{" "}
          <Link to="/login" className="text-red-500 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
