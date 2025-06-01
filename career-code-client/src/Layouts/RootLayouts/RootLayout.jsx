import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../Shared/Navbar";
import Footer from "../../Shared/Footer";

const RootLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main
        className="
      min-h-[calc(100vh-268px)]"
      >
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
