import { NavLink, useLocation } from "react-router-dom";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { useState, useMemo } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SideBar = () => {
  const { user, axios, fetchUser, loading, setLoading } = useAppContext();
  const [image, setImage] = useState(null);

  const location = useLocation();

  const updateImage = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      const { data } = await axios.post("/api/owner/update-image", formData);

      if (data?.success) {
        await fetchUser();
        toast.success(data?.message);
        setImage(null);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const previewSrc = useMemo(() => {
    return image
      ? URL.createObjectURL(image)
      : user?.image || assets.user_profile;
  }, [image, user?.image]);

  return (
    <div className="relative h-full w-full md:flex flex-col items-center pt-3 md:pt-5 max-w-14 md:max-w-48 border-r border-borderColor text-sm">
      <div className="group relative w-12 h-12 md:w-20 md:h-20 mx-auto">
        <img
          src={previewSrc}
          alt="user_image"
          className="w-full h-full rounded-full object-cover aspect-square"
          onError={(e) => (e.target.src = assets.user_profile)}
        />

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
      </div>

      {image && (
        <button
          className="absolute top-0 left-0 flex gap-1 p-2 text-primary 
           bg-primary-dull/20 rounded-bl cursor-pointer disabled:cursor-not-allowed"
          onClick={updateImage}
          disabled={loading}
        >
          <span className="max-md:hidden">Save</span>
          <img src={assets.check_icon} alt="save" width={13} />
        </button>
      )}

      <p className="mt-2 text-sm font-semibold text-gray-600 capitalize max-md:hidden">
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
