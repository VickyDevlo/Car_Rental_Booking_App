import { Link } from "react-router-dom";
import { assets, dummyUserData } from "../../assets/assets";

const OwnerNavbar = () => {
  const user = dummyUserData;
  return (
    <div
      className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-borderColor
    relative transition-all"
    >
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-7" />
      </Link>
      <p className="text-sm md:text-base font-medium text-gray-500">
        Welcome, {user?.name || "Owner"}
      </p>
    </div>
  );
};

export default OwnerNavbar;
