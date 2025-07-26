import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [image, setImage] = useState(null);
  const [sidebarPreview, setSidebarPreview] = useState(assets.user_profile);

  // ✅ Fetch user data
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data?.user);
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Sync isOwner when user changes
  useEffect(() => {
    if (user?.role === "owner") {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [user]);

  // ✅ Memoized fetchCars
  const fetchCars = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success ? setCars(data?.cars) : toast.error(data?.message);
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data?.success) {
        await fetchUser(); // fetch updated role
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateImage = async () => {
    if (!image) return;

    const previousPreview = sidebarPreview;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post("/api/owner/update-image", formData);

      if (data?.success) {
        await fetchUser();
        toast.success(data?.message);
        setImage(null);
      } else {
        toast.error(data?.message || "Something went wrong!");
        setImage(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Network error. Please try again.");
      setImage(null);
      setSidebarPreview(previousPreview);
    } finally {
      setLoading(false);
    }
  };

  const displayImage = useMemo(() => {
    return user?.image || assets.user_profile;
  }, [user?.image]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("You have been logged out.");
    navigate("/");
  };

  // ✅ Fetch user and cars when token is available
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      fetchUser();
    }

    fetchCars(); // always fetch cars regardless of login status
  }, [token, fetchCars]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    image,
    setImage,
    updateImage,
    displayImage,
    isOwner,
    setIsOwner,
    showLogin,
    setShowLogin,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    fetchUser,
    fetchCars,
    changeRole,
    logout,
    loading,
    setLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
