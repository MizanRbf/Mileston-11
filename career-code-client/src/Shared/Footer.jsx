import React from "react";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-secondary text-white py-10">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between">
        {/* Company Logo */}
        <div>
          <h2>CareerCode</h2>
        </div>
        {/* Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <nav className="flex flex-col *:hover:underline">
            <Link to="/">Home</Link>
            <Link to="/addJobs">Add Job</Link>
            <Link to="/allJobs">All Jobs</Link>
            <Link to="/myApplications">My Applications</Link>
          </nav>
        </div>
        {/* Policies */}
        <div>
          <h4>Legal</h4>
          <nav className="flex flex-col *:hover:underline">
            <a href="">Terms & Conditions</a>
            <a href="">License</a>
            <a href="">Privacy Policy</a>
            <a href="">All Right Reserved</a>
            <a href=""></a>
          </nav>
        </div>
        {/* Social Link */}
        <div className="flex items-end">
          <div className="">
            <h4>Social Links</h4>
            <nav className="flex gap-2">
              <a href="https://www.facebook.com/">
                <FaFacebook size={20} />
              </a>
              <a href="https://x.com/">
                <FaLinkedin size={20} />
              </a>
              <a href="https://www.linkedin.com/">
                <FaXTwitter size={20} />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
