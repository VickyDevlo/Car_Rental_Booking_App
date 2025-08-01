import { NavLink, useLocation } from "react-router-dom";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

const SideBar = () => {
  const { user, image, setImage, updateImage, displayImage, loading } =
    useAppContext();
  const location = useLocation();

  const userProfile = image ? URL.createObjectURL(image) : displayImage;
  const isUserReady = user?.name && displayImage;

  useEffect(() => {
    image && updateImage();
  }, [image]);

  return (
    <div className="relative h-full w-full md:flex flex-col items-center pt-3 md:pt-5 max-w-14 md:max-w-48 border-r border-borderColor text-sm">
      <div className="group relative w-12 h-12 md:w-20 md:h-20 mx-auto">
        {isUserReady ? (
          <>
            <label
              htmlFor="image"
              className="relative cursor-pointer w-20 h-20 sm:w-24 sm:h-24"
            >
              <img
                src={userProfile}
                alt="user_image"
                className="w-full h-full rounded-full object-cover aspect-square"
                onError={(e) => (e.target.src = assets.user_profile)}
              />

              {/* Optional overlay for edit icon */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition sm:flex sm:opacity-0">
                <span className="text-white text-sm">Change</span>
              </div>
            </label>

            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              disabled={loading}
            />

            {/* Hover overlay for editing (disabled if loading) */}
            <label
              htmlFor="image"
              className={`absolute inset-0 rounded-full cursor-pointer bg-black/10 ${
                loading ? "cursor-not-allowed" : "group-hover:flex hidden"
              } items-center justify-center`}
            >
              {!loading && <img src={assets.edit_icon} alt="edit" />}
            </label>

            {/* Loading Spinner Overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </>
        ) : (
          // Skeleton circle for loading
          <div className="w-full h-full rounded-full bg-gray-200 animate-pulse" />
        )}
      </div>

      {isUserReady ? (
        <p className="mt-2 text-sm font-semibold text-gray-600 capitalize max-md:hidden truncate">
          {user?.name}
        </p>
      ) : (
        <div className="mt-3 h-4 w-20 bg-gray-200 rounded animate-pulse max-md:hidden" />
      )}

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
              alt="menu_icon"
              className="shrink-0"
            />
            <span className="max-md:hidden whitespace-nowrap truncate">
              {menu.name}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
