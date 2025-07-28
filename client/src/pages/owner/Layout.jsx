import SideBar from "../../components/owner/SideBar";
import OwnerNavbar from "../../components/owner/OwnerNavbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <OwnerNavbar />
      <div className="flex flex-1">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};
