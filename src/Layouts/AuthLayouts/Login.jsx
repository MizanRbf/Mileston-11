import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const location = useLocation();
  const { loginUser, setUser } = use(AuthContext);
  const navigate = useNavigate();
  const from = location.state || "/";

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    // login User
    loginUser(email, password)
      .then((result) => {
        setUser(result.user);
        navigate(from);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="text-center">Login Your Account</h2>
        <hr className="text-[#e5e5e5] my-4" />
        <form onSubmit={handleLogin} className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button type="submit" className="btn  mt-4 button">
            Login
          </button>
        </form>

        {/* Or */}
        <div className="flex items-center gap-3">
          <hr className="text-[#e5e5e5] flex-grow" />
          <span>or</span>
          <hr className="text-[#e5e5e5] flex-grow" />
        </div>

        {/* Google Button */}
        {/* Google */}
        <SocialLogin from={from}></SocialLogin>

        <p className="text-center">
          Don't have an account{" "}
          <Link
            to="/register"
            className="text-red-500 hover:underline font-bold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
