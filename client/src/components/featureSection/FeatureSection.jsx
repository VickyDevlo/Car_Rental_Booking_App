import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { CarCard, Title } from "../../components";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

const FeatureSection = () => {
  const { navigate, cars, fetchCars, user } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cars) {
      fetchCars().finally(() => setLoading(false));
    }
  }, [cars]);

  useEffect(() => {
    user && fetchCars();
  }, [user]);

  const skeletons = Array(6).fill(null);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="container mx-auto flex flex-col items-center py-12 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure."
        />
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full"
      >
        {loading
          ? skeletons.map((_, index) => (
              <div
                key={index}
                className="animate-pulse border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4"
              >
                <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex justify-between items-center mt-2">
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-3 items-center mt-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))
          : cars?.slice(0, 6).map((carData) => (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                key={carData?._id}
              >
                <CarCard car={carData} />
              </motion.div>
            ))}
      </motion.div>

      {!loading && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate("/cars");
            scrollTo(0, 0);
          }}
          className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-16 capitalize cursor-pointer"
        >
          Explore all cars
          <img src={assets.arrow_icon} alt="arrow" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default FeatureSection;
