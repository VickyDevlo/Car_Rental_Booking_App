import { assets } from "../../assets/assets";
import { motion } from "motion/react";
import { useAppContext } from "../../context/AppContext";

const Banner = () => {
  const { changeRole, isOwner, navigate } = useAppContext();

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="md:px-16"
    >
      <div
        className="flex flex-col md:flex-row md:items-start items-center gap-4
    justify-between px-8 min-md:pl-14 p-12 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
      >
        <div className="text-white">
          <h2 className="text-lg max-md:text-center md:text-3xl font-bold">
            Do You Own a Luxury Car?
          </h2>
          <p className="mt-2">
            Monetize your vehicle effortlessly by listing it on CarRental.
          </p>
          <p className="max-w-[600px] w-full mt-2">
            We take care of insurance, driver verification and secure payments —
            so you can earn passive income, stress-free.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="px-6 py-2 bg-white text-primary rounded-lg text-sm mt-4 cursor-pointer hover:bg-slate-100 transition-all"
          >
            {isOwner ? "Dashboard" : " List your car"}
          </motion.button>
        </div>
        <motion.img
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          src={assets.banner_car_image}
          alt="car"
          className="max-h-44 max-md:mt-5"
        />
      </div>
    </motion.div>
  );
};

export default Banner;
