import { useCallback, useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { BiUser } from "react-icons/bi";
import { assets } from "../../assets/assets";
import { TiTick } from "react-icons/ti";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  const [confirmPassword, setConfirmPassword] = useState("");

  const currPassRef = useRef(null);
  const isOwner = user?.role === "owner";

  useEffect(() => {
    currPassRef.current?.focus();
  }, []);

  const isMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;
  const hasConfirm = !!confirmPassword;
  const isDisabled =
    !currPassword || !newPassword || !confirmPassword || loading;

  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      if (newPassword.trim().length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return;
      }

      if (currPassword === newPassword) {
        toast.error("Current password and new password must not be the same.");
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match.");
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
          setConfirmPassword("");
          logout();
          localStorage.removeItem("token");
          setShowLogin(true);
          toast.dismiss();
          toast.success("🔐 Password updated. Please log in again.");
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
    },
    [
      currPassword,
      newPassword,
      confirmPassword,
      axios,
      logout,
      setShowLogin,
      setLoading,
    ]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center text-sm text-gray-600 bg-light/50">
      <form
        onSubmit={submitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-md 
        rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <img
          src={assets.arrow_icon}
          onClick={() => navigate(-1)}
          alt="Back"
          className="rotate-180 cursor-pointer"
        />

        <div className="flex items-center justify-center w-full">
          {isOwner ? (
            <img
              src={displayImage || assets.default_avatar}
              alt="user"
              className="w-20 h-20 md:w-30 md:h-30 rounded-full object-cover"
            />
          ) : (
            <BiUser className="bg-light rounded-full p-2 text-gray-800 size-30 md:size-40" />
          )}
        </div>

        {/* Current Password */}
        <div className="w-full">
          <label className="sr-only" htmlFor="current-password">
            Current Password
          </label>
          <div className="flex items-center border border-gray-200 rounded p-1 mt-1 focus-within:ring-2 focus-within:ring-primary/60">
            <input
              id="current-password"
              type="password"
              ref={currPassRef}
              placeholder="Current Password"
              autoComplete="current-password"
              value={currPassword}
              disabled={loading}
              onChange={(e) => setCurrPassword(e.target.value)}
              className="w-full p-1 focus:outline-none"
            />
          </div>
        </div>

        {/* New Password */}
        <div className="w-full">
          <label className="sr-only" htmlFor="new-password">
            New Password
          </label>
          <div className="flex items-center border border-gray-200 rounded p-1 mt-1 focus-within:ring-2 focus-within:ring-primary/60">
            <input
              id="new-password"
              type="password"
              placeholder="New Password"
              autoComplete="new-password"
              value={newPassword}
              disabled={loading}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-1 focus:outline-none"
            />
          </div>
          <span className="text-xs text-gray-400 mt-1 ml-1">
            Minimum 8 characters
          </span>
        </div>

        {/* Confirm Password */}
        <div className="w-full">
          <label className="sr-only" htmlFor="confirm-password">
            Confirm Password
          </label>
          <div
            className={`flex items-center rounded p-1 mt-1 border focus-within:ring-2 transition-all ${
              isMatch
                ? "border-green-600 focus-within:ring-green-600"
                : hasConfirm
                ? "border-red-600 focus-within:ring-red-600"
                : "border-gray-200 focus-within:ring-primary/60"
            }`}
          >
            <input
              id="confirm-password"
              type="text"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={confirmPassword}
              disabled={loading}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-1 focus:outline-none"
            />
            {isMatch && <TiTick size={25} className="text-green-600" />}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full py-2 rounded-md font-medium tracking-wide text-white transition-all ${
            isDisabled
              ? "bg-primary opacity-30 cursor-not-allowed"
              : "bg-primary hover:bg-primary-dull cursor-pointer"
          }`}
        >
          {loading ? (
            <Loader className="h-5 w-5 border-2 mx-auto" />
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
