import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { CarCard, Title } from "../../components";
import { useAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { FeatureSectionSkeleton } from "../shared/FeatureSectionSkeleton";

const FeatureSection = () => {
  const { navigate, cars, fetchCars } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      await fetchCars();
      setLoading(false);
    };

    loadCars();
  }, [fetchCars]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center py-12 px-6 md:px-16 lg:px-24 xl:px-32"
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
        // className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto"
      >
        {loading ? (
          <FeatureSectionSkeleton />
        ) : (
          cars?.slice(0, 6).map((carData) => (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              key={carData?._id}
            >
              <CarCard car={carData} />
            </motion.div>
          ))
        )}
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
