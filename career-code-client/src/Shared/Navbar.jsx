import React, { use } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";

const Navbar = () => {
  const { user, logOutUser } = use(AuthContext);
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    logOutUser()
      .then()
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-secondary py-3">
      <nav className="flex justify-between max-w-[1200px] mx-auto items-center px-4">
        {/* Company Logo */}
        <div>
          <h2 className="text-primary">CareerCode</h2>
        </div>
        {/* NavLinks */}
        <div className="space-x-4 text-white">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/allJobs">All Jobs</NavLink>

          {/* For Applicant links. Check roles as well */}
          {user && <NavLink to="/myApplications">My Applications</NavLink>}

          {/* For Recruiter. Check role as well */}
          {user && (
            <>
              <NavLink to="/addJob">Add Job</NavLink>
              <NavLink to="/myPostedJobs">My Posted Jobs</NavLink>
            </>
          )}
        </div>

        {/* Authentication */}
        <div className="flex gap-2">
          {/* User Info */}
          {user && (
            <img
              className="w-10 rounded-full h-10 ring-2"
              src={user?.photoURL}
              alt=""
            />
          )}

          {/* Login & LogOut Button */}
          {user ? (
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="button" onClick={() => navigate("/Login")}>
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
