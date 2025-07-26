import { assets } from "../../assets/assets";
import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { useMemo } from "react";
import { toast } from "react-hot-toast";

const Banner = () => {
  const { user, navigate } = useAppContext();

  const isOwner = useMemo(() => user?.role === "owner", [user]);

  const handleClick = () => {
    if (isOwner) {
      navigate("/owner");
    } else {
      toast.error("You are not authorized to access the owner dashboard.");
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="px-8 md:px-16"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] p-12 rounded-2xl max-w-6xl mx-3 md:mx-auto overflow-hidden">
        {/* Text Section */}
        <div className="text-white">
          <h2 className="text-lg md:text-3xl font-bold text-center md:text-left">
            Do You Own a Luxury Car?
          </h2>
          <p className="mt-2 text-center md:text-left">
            Monetize your vehicle effortlessly by listing it on CarRental.
          </p>
          <p className="mt-2 max-w-[600px] text-center md:text-left">
            We take care of insurance, driver verification and secure payments —
            so you can earn passive income, stress-free.
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="mt-4 px-6 py-2 bg-white text-primary rounded-lg text-sm hover:bg-slate-100 transition-all"
          >
            {isOwner ? "Dashboard" : "List your car"}
          </motion.button>
        </div>

        {/* Image Section */}
        <motion.img
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          src={assets.banner_car_image}
          alt="car"
          className="max-h-44 mt-5 md:mt-0"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export default Banner;
