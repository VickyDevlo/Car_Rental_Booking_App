import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export const ProtectedRoute = () => {
  const { user } = useAppContext();

  const isLoggedIn = user?.role === "owner" || user;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
