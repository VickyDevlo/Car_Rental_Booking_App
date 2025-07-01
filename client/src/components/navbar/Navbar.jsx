import { useState } from "react";
import { assets, menuLinks } from "../../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div
      className={`border-b border-borderColor relative transition-all 
     ${location.pathname === "/" && "bg-light"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-8" />
        </Link>
        <div
          className={`max-sm:fixed right-0 max-sm:top-[65px] max-sm:h-screen max-sm:w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
            location.pathname === "/" && "bg-light"
          }
           ${open ? "max-sm:-translate-x-0" : "max-sm:-translate-x-full"}`}
        >
          {menuLinks.map((menu, i) => (
            <NavLink
              key={i}
              to={menu.path}
              className="font-semibold max-sm:w-full"
            >
              {menu.name}
            </NavLink>
          ))}
        </div>
        <img
          src={assets.menu_icon}
          alt=""
          className="max-sm:block hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
    </div>
  );
};

export default Navbar;
