import SideBar from "../../components/owner/SideBar";
import OwnerNavbar from "../../components/owner/OwnerNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

export const Layout = () => {
  const { isOwner, user } = useAppContext();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Only run the check after user has been set
  //   if () {
  //     navigate("/");
  //   }
  // }, [user, isOwner, navigate]);

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
