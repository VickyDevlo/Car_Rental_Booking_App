import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useRef, useState } from "react";
import { OwnerProfileSkeleton } from "../shared/OwnerProfileSkeleton";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

const OwnerNavbar = () => {
  const { user, displayImage, logout, navigate } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user?.name && displayImage) {
      setLoading(false);
    }
  }, [user, displayImage]);

  // Hide dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-borderColor relative transition-all">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-7" />
      </Link>

      <div className="relative" ref={dropdownRef}>
        {loading ? (
          <OwnerProfileSkeleton />
        ) : (
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <img
              src={displayImage}
              alt="user_image"
              className="w-8 h-8 rounded-full shrink-0 object-cover aspect-square"
              onError={(e) => (e.target.src = assets.user_profile)}
            />
            <p className="max-md:hidden text-sm md:text-base font-medium text-gray-500 capitalize truncate">
              {user?.role || "Owner"}
            </p>
          </div>
        )}

        {/* Dropdown */}
        {showDropdown && (
          <div
            className="absolute max-sm:left-0 -right-6 top-10 w-58
           bg-white border border-gray-200 rounded-md shadow-lg z-50"
          >
            <button
              onClick={() => {
                setShowDropdown(false);
                navigate("/change-password");
              }}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-base font-medium transition-all
                   duration-200 cursor-pointer"
            >
              <RiLockPasswordFill size={18} />
              Change Password
            </button>
            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-base font-medium transition-all
                   duration-200 cursor-pointer"
            >
              <BiLogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerNavbar;
