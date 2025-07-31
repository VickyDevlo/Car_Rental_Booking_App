import { useState, useRef, useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { dropDownMenus } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const UserDropdown = () => {
  const { navigate, logout, user } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const userIcon = user?.name.slice(0, 1);

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
    <div className="relative" ref={dropdownRef}>
      {/* User Icon Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-9 h-9 rounded-full
         bg-primary/20 font-semibold text-md shadow-md cursor-pointer capitalize"
      >
        {user ? (
          userIcon
        ) : (
          <BiUser className="text-xl text-gray-600" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute max-sm:left-0 -right-20 top-12 w-58 bg-white border
         border-gray-200 rounded-md shadow-lg z-50"
        >
          <ul className="py-1 text-sm text-gray-700">
            {dropDownMenus.map((menu) => (
              <li key={menu.label}>
                <button
                  onClick={() => {
                    if (menu.path === "/") {
                      logout();
                    } else {
                      navigate(menu.path);
                    }
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-base font-medium transition-all
                   duration-200 cursor-pointer"
                >
                  <menu.icon className="text-lg text-gray-600" />
                  {menu.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
