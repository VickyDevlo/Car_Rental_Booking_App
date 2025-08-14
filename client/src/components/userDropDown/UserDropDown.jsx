import { useRef, useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useAppContext } from "../../context/AppContext";
import { RiLockPasswordFill } from "react-icons/ri";
import { Dialog } from "../shared/Dialog";

const UserDropdown = ({ isOpen, setIsOpen, setMenuOpen }) => {
  const { navigate, logout } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setOpenModal(false);
    if (setMenuOpen) {
      setMenuOpen(false);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEnterKey = (e) => {
      if (openModal && (e.key === "Enter" || e.keyCode === 13)) {
        e.preventDefault();
        handleLogout();
      }
    };

    document.addEventListener("keydown", handleEnterKey);
    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, [openModal]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      {isOpen && (
        <div className="absolute max-sm:-right-50 -right-6 max-sm:top-0 top-8 w-58 bg-gray-100 border border-gray-200 rounded-md shadow-lg">
          <button
            onClick={() => {
              navigate("/change-password");
            }}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-base font-medium transition-all duration-200 cursor-pointer"
          >
            <RiLockPasswordFill size={18} />
            Change Password
          </button>
          <button
            onClick={() => {
              setOpenModal(true);
              setIsOpen(false);
              if (setMenuOpen) {
                setMenuOpen(false);
              }
            }}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-base font-medium transition-all duration-200 cursor-pointer"
          >
            <BiLogOut size={18} />
            Logout
          </button>
        </div>
      )}
      <Dialog isOpen={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
        <p className="text-sm text-gray-600 mb-5 ml-2">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setOpenModal(false);
              setIsOpen(false);
              if (setMenuOpen) {
                setMenuOpen(false);
              }
            }}
            className="px-4 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 rounded bg-red-500 hover:bg-red-600 
            text-white transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default UserDropdown;
