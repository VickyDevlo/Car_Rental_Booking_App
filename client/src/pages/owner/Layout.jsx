import React from "react";
import SideBar from "../../components/owner/SideBar";
import OwnerNavbar from "../../components/owner/OwnerNavbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex flex-col">
      <OwnerNavbar />
      <div className="flex">
      <SideBar />
      <Outlet />
      </div>
    </div>
  );
};
