import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { BiUser } from "react-icons/bi";
import { assets } from "../../assets/assets";

const ChangePassword = () => {
  const {
    displayImage,
    user,
    axios,
    setShowLogin,
    loading,
    setLoading,
    logout,
    navigate,
  } = useAppContext();

  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const currPassRef = useRef(null);
  const newPassRef = useRef(null);

  const isOwner = user?.role === "owner";
  const isDisabled = !currPassword || !newPassword;

  useEffect(() => {
    currPassRef.current.focus();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newPassword.trim().length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.put("/api/user/change-password", {
        currentPassword: currPassword,
        newPassword,
      });

      if (data.success) {
        setCurrPassword("");
        setNewPassword("");

        logout();
        localStorage.removeItem("token");
        setShowLogin(true);

        toast.dismiss();
        toast("🔐 Login again to continue.");
      } else {
        toast.error(data.message || "Failed to update password.");
        if (data.message === "User not found.") {
          logout();
          setShowLogin(true);
          toast.dismiss();
          toast("⚠️ Session expired. Please log in again.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center  
      text-sm text-gray-600 bg-light/50"
    >
      <form
        onSubmit={submitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-md 
        rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <img
          src={assets.arrow_icon}
          onClick={() => navigate(-1)}
          alt="back-arrow"
          className="rotate-180 cursor-pointer"
        />

        <div className="flex items-center justify-center w-full">
          {isOwner ? (
            <img
              src={displayImage}
              alt="user_image"
              className="w-20 h-20 md:w-30 md:h-30 rounded-full object-cover"
            />
          ) : (
            <BiUser className="bg-light rounded-full p-2 text-gray-800 size-30 md:size-40" />
          )}
        </div>

        <input
          type="password"
          placeholder="Current Password"
          ref={currPassRef}
          value={currPassword}
          onChange={(e) => setCurrPassword(e.target.value)}
          className="border border-gray-200 rounded w-full p-2 mt-1 
           outline-primary/60"
        />

        <div className="w-full">
          <input
            type="password"
            placeholder="New Password"
            ref={newPassRef}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 
          outline-primary/60"
          />
          <span className="text-xs text-gray-400 mt-1 ml-1">
            Minimum 8-characters
          </span>
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className={`bg-primary hover:bg-primary-dull font-medium tracking-wide 
          transition-all text-white w-full py-2 rounded-md 
          ${
            isDisabled || loading
              ? "opacity-30 cursor-not-allowed"
              : "cursor-pointer"
          }
          `}
        >
          {!loading ? (
            "Change Password"
          ) : (
            <Loader className="h-5 w-5 border-2" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
