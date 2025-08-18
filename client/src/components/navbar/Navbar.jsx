import { useEffect, useState } from "react";
import { assets, menuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";
import { NavbarSkeleton } from "../shared/NavbarSkeleton";
import UserDropdown from "../userDropDown/UserDropDown";
import { BiUser } from "react-icons/bi";
import { HomeLogo } from "../shared/HomeLogo";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const { setShowLogin, showLogin, user, token, userIcon } = useAppContext();

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
    document.body.style.overflow = showLogin || menuOpen ? "hidden" : "auto";
  }, [showLogin, menuOpen]);

  return (
    <>
      {!loading ? (
        <div
          className={`border-b border-borderColor relative transition-all z-10 ${
            location.pathname === "/" ? "bg-light" : "bg-white"
          }`}
        >
          <div
            className="container mx-auto flex items-center justify-between gap-2
            px-6 md:px-16 lg:px-24 xl:px-32 max-sm:py-2 py-4 text-gray-600"
          >
            {/* logo */}
            <HomeLogo onClick={() => setMenuOpen(false)} />

            {/* Menu Items */}
            <div
              className={`max-sm:fixed z-30 right-0 max-sm:top-[50px] max-sm:h-screen max-sm:w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 max-sm:p-2 transition-all duration-300  ${
                location.pathname === "/"
                  ? "max-sm:bg-light"
                  : "max-sm:bg-white"
              } ${
                menuOpen ? "max-sm:-translate-x-0" : "max-sm:-translate-x-full"
              }`}
            >
              {/* Filtered Nav Links */}
              {filteredMenuLinks.map((menu, i) => (
                <NavLink
                  key={i}
                  to={menu.path}
                  onClick={() => setMenuOpen(false)}
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
                  onClick={() => setMenuOpen(false)}
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

              <>
                {user?.role === "user" && (
                  <div className="relative">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center justify-center w-8 h-8 cursor-pointer rounded-full bg-primary/20 shadow-md hover:bg-primary/30 transition-colors text-gray-700
                       font-semibold capitalize"
                    >
                      {userIcon ? (
                        <span className="text-sm">{userIcon}</span>
                      ) : (
                        <BiUser className="text-lg" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="absolute max-sm:top-12 top-5 right-0 z-50">
                        <UserDropdown
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          setMenuOpen={setMenuOpen}
                        />
                      </div>
                    )}
                  </div>
                )}
              </>

              {!user && (
                <div className="flex max-sm:flex-col items-start sm:items-center gap-4 max-sm:w-full">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      user ? logout() : setShowLogin(true);
                      setMenuOpen(false);
                    }}
                    className={`text-white text-sm font-medium px-6 py-1.5
                     bg-primary hover:bg-primary-dull  rounded-sm md:mr-1 
                     cursor-pointer transition-all`}
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
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img
                src={menuOpen ? assets.close_icon : assets.menu_icon}
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
