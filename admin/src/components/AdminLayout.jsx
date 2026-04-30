import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="ml-64 pt-16 p-6 bg-[#121212] min-h-screen">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;