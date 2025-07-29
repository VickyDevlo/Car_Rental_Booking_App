
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export const ProtectedOwnerRoute = () => {
  const { user } = useAppContext();

  const isOwner = user?.role === 'owner'

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!isOwner) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
 
