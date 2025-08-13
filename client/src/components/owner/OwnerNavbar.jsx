import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useRef, useState } from "react";
import { OwnerProfileSkeleton } from "../shared/OwnerProfileSkeleton";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { Dialog } from "../shared/Dialog";
import UserDropdown from "../userDropDown/UserDropDown";

const OwnerNavbar = () => {
  const { user, displayImage, logout, navigate } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

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
            onClick={() => setIsOpen((prev) => !prev)}
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
        <div className="absolute top-2 right-3 max-sm:top-10 max-sm:right-48">
          <UserDropdown isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-semibold">Confirm Logout</h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-md border border-gray-300
             hover:bg-gray-100 cursor-pointer font-medium"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-red-500 text-white
             hover:bg-red-600 cursor-pointer font-medium"
            onClick={() => {
              logout();
              setOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default OwnerNavbar;
