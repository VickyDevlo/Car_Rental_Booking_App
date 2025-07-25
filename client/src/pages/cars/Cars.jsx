import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { CarCard, Title } from "../../components";
import { CarCardSkeleton } from "../../components/shared/CardSkeleton";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [searchInput, setSearchInput] = useState("");
  const [filterCars, setFilterCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const applyFilter = async () => {
    if (searchInput === "") {
      setFilterCars(cars);
      return;
    }
    const filtered = cars.slice().filter((car) => {
      return (
        car.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
        car.model.toLowerCase().includes(searchInput.toLowerCase()) ||
        car.category.toLowerCase().includes(searchInput.toLowerCase()) ||
        car.transmission.toLowerCase().includes(searchInput.toLowerCase()) ||
        car.fuelType.toLowerCase().includes(searchInput.toLowerCase()) ||
        car.location.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilterCars(filtered);
  };

  const searchCarAvailability = async () => {
    const { data } = await axios.post("/api/bookings/check-availability", {
      location: pickupLocation,
      pickupDate,
      returnDate,
    });
    if (data?.success) {
      setFilterCars(data?.availableCars);
      if (data.availableCars.length === 0) {
        toast("No cars available");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else {
      setFilterCars(cars);
      setLoading(false);
    }
  }, [cars]);

  useEffect(() => {
    if (!isSearchData) applyFilter();
  }, [searchInput]);

  return (
    <div className="mt-8 md:mt-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center py-20 max-md:px-4 bg-light"
      >
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white flex items-center px-4 h-12 mt-6 max-w-xl w-full rounded-full shadow-lg"
        >
          <img src={assets.search_icon} alt="search" className="w-4 h-4 mr-2" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by make model or features..."
            className="text-gray-600 w-full h-full font-medium focus:outline-none max-md:placeholder:text-sm capitalize truncate"
          />
          <img
            src={assets.filter_icon}
            alt="filter"
            className="w-4 h-4 ml-2 cursor-pointer"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 my-12"
      >
        {loading ? (
          <div className="h-6 bg-gray-200 rounded mb-2 w-44 animate-pulse" />
        ) : (
          <p className="font-medium text-gray-400 xl:px-20 max-w-7xl mx-auto">
            Showing {filterCars.length}{" "}
            {filterCars.length === 1 ? "Car" : "Cars"}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {loading
            ? Array(cars.length)
                .fill(0)
                .map((_, i) => <CarCardSkeleton key={i} />)
            : filterCars?.map((car, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  key={i}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Cars;
