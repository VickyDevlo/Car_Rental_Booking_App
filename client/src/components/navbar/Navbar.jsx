import { useEffect, useState } from "react";
import { assets, menuLinks } from "../../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";
import { NavbarSkeleton } from "../shared/NavbarSkeleton";
import UserDropdown from "../userDropDown/UserDropDown";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const { setShowLogin, showLogin, user, token } = useAppContext();

  const isOwner = user?.role === "owner";

  const filteredMenuLinks = menuLinks.filter(
    (navLink) => !(isOwner && navLink.name === "My Bookings")
  );

  useEffect(() => {
    if (user !== undefined && token !== undefined) {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    document.body.style.overflow = showLogin || open ? "hidden" : "auto";
  }, [showLogin, open]);

  return (
    <>
      {!loading ? (
        <div
          className={`border-b border-borderColor relative transition-all ${
            location.pathname === "/" ? "bg-light" : "bg-white"
          }`}
        >
          <div className="container mx-auto flex items-center justify-between gap-2 px-6 md:px-16 lg:px-24 xl:px-32 max-sm:py-2 py-4 text-gray-600">
            {/* Logo */}
            <Link to="/">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={assets.logo}
                onClick={() => setOpen(false)}
                alt="logo"
                className="h-8 shrink-0 md:ml-1"
              />
            </Link>

            {/* Menu Items */}
            <div
              className={`max-sm:fixed right-0 max-sm:top-[54px] max-sm:h-screen max-sm:w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 max-sm:p-2 transition-all duration-300 z-10  ${
                location.pathname === "/"
                  ? "max-sm:bg-light"
                  : "max-sm:bg-white"
              } ${open ? "max-sm:-translate-x-0" : "max-sm:-translate-x-full"}`}
            >
              {/* Filtered Nav Links */}
              {filteredMenuLinks.map((menu, i) => (
                <NavLink
                  key={i}
                  to={menu.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-medium max-sm:w-full max-sm:p-2 md:ml-1 whitespace-nowrap
                     max-sm:hover:bg-primary-dull/20 transition-all duration-200 rounded
                     ${
                       isActive ? "text-primary max-sm:bg-primary-dull/20" : ""
                     }`
                  }
                >
                  {menu.name}
                </NavLink>
              ))}

              {/* Dashboard or List Cars */}
              {isOwner && (
                <NavLink
                  to="/owner"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-medium max-sm:w-full max-sm:p-2 md:ml-1 whitespace-nowrap
                       max-sm:hover:bg-primary-dull/20 transition-all duration-200 rounded
                       ${
                         isActive
                           ? "text-primary max-sm:bg-primary-dull/20"
                           : ""
                       }`
                  }
                >
                  Dashboard
                </NavLink>
              )}

              {/* Search Input */}
              <div className="hidden lg:flex items-center gap-2 text-sm border border-borderColor px-3 rounded-full max-w-56">
                <input
                  type="text"
                  placeholder="Search products"
                  className="bg-transparent w-full py-1.5 placeholder-gray-500 outline-none"
                />
                <img src={assets.search_icon} alt="search" />
              </div>
              {user && !isOwner && <UserDropdown />}

              {!user && (
                <div className="flex max-sm:flex-col items-start sm:items-center gap-4 max-sm:w-full">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      user ? logout() : setShowLogin(true);
                      setOpen(false);
                    }}
                    className={`text-white text-sm font-medium px-6 py-1.5
                     bg-primary hover:bg-primary-dull  rounded-sm md:mr-1 cursor-pointer transition-all`}
                  >
                    Login
                  </motion.button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="sm:hidden cursor-pointer"
              aria-label="Menu"
              onClick={() => setOpen(!open)}
            >
              <img
                src={open ? assets.close_icon : assets.menu_icon}
                alt="menu"
              />
            </button>
          </div>
        </div>
      ) : (
        <NavbarSkeleton />
      )}
    </>
  );
};

export default Navbar;
