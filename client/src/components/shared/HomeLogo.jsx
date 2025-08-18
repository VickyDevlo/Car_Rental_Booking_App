import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export const HomeLogo = ({ onClick }) => {
  return (
    <Link to="/">
      <motion.img
        whileHover={{ scale: 1.05 }}
        src={assets.logo}
        onClick={onClick}
        alt="logo"
        className="h-8 shrink-0 md:ml-1"
      />
    </Link>
  );
};
