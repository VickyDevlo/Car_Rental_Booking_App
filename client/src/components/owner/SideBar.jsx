import { NavLink, useLocation } from "react-router-dom";
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/assets";
import { useState } from "react";

const SideBar = () => {
  const user = dummyUserData;
  const [image, setImage] = useState("");

  const location = useLocation();
  const updateImage = async () => {
    user.image = URL.createObjectURL(image);
    setImage("");
  };

  return (
    <div className="relative h-full w-full md:flex flex-col items-center pt-3 md:pt-5 max-w-14 md:max-w-48 border-r border-borderColor text-sm">
      <div className="group relative">
        <label
          htmlFor="image"
          className="block w-14 h-14 md:w-20 md:h-20 mx-auto"
        >
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image || assets.user_profile
            }
            alt="user_image"
            className="md:w-full md:h-full h-10 w-10 rounded-full object-cover aspect-square mx-auto"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="edit" />
          </div>
        </label>
      </div>
      {image && (
        <button
          className="absolute top-0 left-0 flex gap-1 p-2 text-primary 
           bg-primary-dull/20 rounded-bl cursor-pointer"
          onClick={updateImage}
        >
          <span className="max-md:hidden">Save</span>
          <img src={assets.check_icon} alt="save" width={13} />
        </button>
      )}
      <p className="mt-2 text-sm font-semibold text-gray-600 max-md:hidden">
        {user?.name}
      </p>
      <div className="w-full">
        {ownerMenuLinks.map((menu, i) => (
          <NavLink
            key={i}
            to={menu.path}
            className={`relative flex items-center gap-2 w-full 
              font-semibold py-3 pl-4 first:mt-2 my-0.5 hover:bg-primary/10 ${
                menu.path === location.pathname
                  ? "bg-primary/10 text-primary border-r-5"
                  : "text-gray-600"
              }`}
          >
            <img
              src={
                menu.path === location.pathname ? menu.coloredIcon : menu.icon
              }
              alt="car_icon"
              className="shrink-0"
            />
            <span className="max-md:hidden whitespace-nowrap truncate ">
              {menu.name}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
