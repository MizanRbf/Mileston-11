import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

const Login = () => {
  const location = useLocation();
  const { loginUser, setUser, googleLogin } = use(AuthContext);
  const navigate = useNavigate();

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
        navigate(location.state || "/");
      })
      .catch((error) => console.log(error.message));
  };

  // Google Login
  const handleGoogleLogin = () => {
    googleLogin()
      .then()
      .catch((error) => console.log(error));
    navigate(location.state || "/");
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
        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border-primary"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

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
