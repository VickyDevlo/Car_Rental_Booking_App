import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isOwner, setIsOwner] = useState(user?.role === "owner");
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [image, setImage] = useState(null);
  const [sidebarPreview, setSidebarPreview] = useState(assets.user_profile);

 
  // ✅ Update isOwner when user changes
  useEffect(() => {
    setIsOwner(user?.role === "owner");
  }, [user]);

  // ✅ Fetch current user
  const fetchUser = async () => {
    try {
      // Set token in header if it exists
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const { data } = await axios.get("/api/user/data");

      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        logout();
      }
    } catch (error) {
      console.error("fetchUser error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      }
      logout();
    }
  };

  // ✅ Memoized fetchCars
  const fetchCars = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        await fetchUser();
        toast.success(data.message);
      } else {
        toast.error(data.message);
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

      if (data.success) {
        await fetchUser();
        toast.success(data.message);
        setImage(null);
      } else {
        toast.error(data.message || "Something went wrong!");
        setImage(null);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Network error. Please try again."
      );
      setImage(null);
      setSidebarPreview(previousPreview);
    } finally {
      setLoading(false);
    }
  };

  const displayImage = useMemo(() => {
    return user?.image || assets.user_profile;
  }, [user?.image]);

  // ✅ Set token + user
  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    axios.defaults.headers.common["Authorization"] = token;
  };

  // ✅ Clear everything on logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logout Successfully...");
    navigate("/");
  };

  // ✅ Load token and user on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    }
  }, []);

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
    login,
    loading,
    setLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
