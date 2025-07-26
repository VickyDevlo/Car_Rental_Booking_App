import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { OwnerProfileSkeleton } from "../shared/OwnerProfileSkeleton";

const OwnerNavbar = () => {
  const { user, displayImage } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.name && displayImage) {
      setLoading(false);
    }
  }, [user, displayImage]);

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-borderColor relative transition-all">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-7" />
      </Link>

      <div className="flex items-center gap-1.5 md:gap-3">
        {loading ? (
          <OwnerProfileSkeleton />
        ) : (
          <>
            <img
              src={displayImage}
              alt="user_image"
              className="w-8 h-8 rounded-full shrink-0 object-cover aspect-square"
              onError={(e) => (e.target.src = assets.user_profile)}
            />
            <p className="max-md:hidden text-sm md:text-base font-medium text-gray-500 capitalize truncate">
              {user?.name || "Owner"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OwnerNavbar;
