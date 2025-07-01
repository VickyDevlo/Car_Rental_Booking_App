import { useState } from "react";
import { assets, menuLinks } from "../../assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className={`border-b border-borderColor relative transition-all 
     ${location.pathname === "/" && "bg-light"}`}
    >
      <div className="container mx-auto flex items-center justify-between gap-2 px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-8 shrink-0" />
        </Link>
        <div
          className={`max-sm:fixed right-0 max-sm:top-[65px] max-sm:h-screen max-sm:w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
            location.pathname === "/" && "max-sm:bg-light"
          }
           ${open ? "max-sm:-translate-x-0" : "max-sm:-translate-x-full"}`}
        >
          {menuLinks.map((menu, i) => (
            <NavLink
              key={i}
              to={menu.path}
              onClick={()=>setOpen(!open)}
              className="font-medium max-sm:w-full whitespace-nowrap"
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
            <img src={assets.search_icon} alt="serach" />
          </div>
          <div className="flex max-sm:flex-col items-start sm:items-center gap-4">
            <button
              onClick={() => navigate("/owner")}
              className="text-sm cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="text-white text-sm font-medium px-6 py-1.5 bg-primary
             hover:bg-primary-dull rounded-lg cursor-pointer transition-all"
            >
              Login
            </button>
          </div>
        </div>
        <button
          className="sm:hidden cursor-pointer"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
