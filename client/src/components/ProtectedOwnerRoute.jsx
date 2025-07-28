import { useAppContext } from "../context/AppContext";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const OwnerRoute = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    if (user?.role === "user" || !user) {
      toast.error("Please log in to continue.");
      navigate("/");
    } else {
      navigate('/owner')
    }
  }, [user, navigate]);

  // Avoid rendering anything until authorization is verified
  if (!authorized) return null;

  return <Outlet />;
};

export default OwnerRoute;
