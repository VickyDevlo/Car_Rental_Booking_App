import { useEffect, useState } from "react";
import { assets, menuLinks } from "../../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";
import { NavbarSkeleton } from "../shared/NavbarSkeleton";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const { setShowLogin, showLogin, user, changeRole, logout, navigate } =
    useAppContext();

  const isOwner = user?.role === "owner";

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "auto";
  }, [showLogin]);

  console.log(user && "user", user?.role);

  return (
    <>
      {loading ? (
        <div
          className={`border-b border-borderColor relative transition-all ${
            location.pathname === "/" ? "bg-light" : "bg-white"
          }`}
        >
          <NavbarSkeleton />
        </div>
      ) : (
        <div
          className={`border-b border-borderColor relative transition-all ${
            location.pathname === "/" && "bg-light"
          }`}
        >
          <div className="container mx-auto flex items-center justify-between gap-2 px-6 md:px-16 lg:px-24 xl:px-32 max-sm:py-2 py-4 text-gray-600">
            <Link to="/">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={assets.logo}
                onClick={() => setOpen(false)}
                alt="logo"
                className="h-8 shrink-0 md:ml-1"
              />
            </Link>

            <div
              className={`max-sm:fixed right-0 max-sm:top-[54px] max-sm:h-screen max-sm:w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 max-sm:p-2 transition-all duration-300 z-10 overflow-hidden ${
                location.pathname === "/"
                  ? "max-sm:bg-light"
                  : "max-sm:bg-white"
              } ${open ? "max-sm:-translate-x-0" : "max-sm:-translate-x-full"}`}
            >
              {menuLinks.map((menu, i) => (
                <NavLink
                  key={i}
                  to={menu.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-medium max-sm:w-full max-sm:p-2 md:ml-1 whitespace-nowrap
                max-sm:hover:bg-primary-dull/20 transition-all duration-200 rounded
                ${isActive ? "text-primary max-sm:bg-primary-dull/20" : ""}`
                  }
                >
                  {menu.name}
                </NavLink>
              ))}

              <div className="hidden lg:flex items-center gap-2 text-sm border border-borderColor px-3 rounded-full max-w-56">
                <input
                  type="text"
                  placeholder="Search products"
                  className="bg-transparent w-full py-1.5 placeholder-gray-500 outline-none"
                />
                <img src={assets.search_icon} alt="search" />
              </div>
              <div className="flex max-sm:flex-col items-start sm:items-center gap-4 max-sm:w-full">
                {isOwner && (
                  <button
                    onClick={() =>
                      isOwner ? navigate("/owner") : changeRole()
                    }
                    className="text-sm cursor-pointer font-medium max-sm:p-2 max-sm:text-start w-full hover:text-primary transition-all 
                  duration-200 rounded"
                  >
                    {isOwner ? "Dashboard" : "List Cars"}
                  </button>
                )}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    user ? logout() : setShowLogin(true);
                    setOpen(false);
                  }}
                  className={`text-white text-sm font-medium px-6 py-1.5  ${
                    user
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-primary hover:bg-primary-dull"
                  } rounded-sm md:mr-1 cursor-pointer transition-all`}
                >
                  {user ? "Logout" : "Login"}
                </motion.button>
              </div>
            </div>

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
      )}
    </>
  );
};

export default Navbar;
