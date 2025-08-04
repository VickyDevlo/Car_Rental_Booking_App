import { useEffect, useMemo, useState } from "react";
import { assets } from "../../assets/assets";
import { CarCard, Title } from "../../components";
import { CarCardSkeleton } from "../../components/shared/CardSkeleton";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation")?.toLowerCase() || "";
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, fetchCars, axios } = useAppContext();

  const [searchInput, setSearchInput] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [debouncedInput, setDebouncedInput] = useState("");

  const isSearchData = pickupLocation && pickupDate && returnDate;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(searchInput.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch cars initially
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // Search car availability only once after cars are loaded
  useEffect(() => {
    if (cars.length > 0 && isSearchData && !hasSearched) {
      setHasSearched(true); // Prevent multiple calls
      searchCarAvailability();
    }

    if (cars.length > 0 && !isSearchData) {
      setFilteredCars(cars);
      setLoading(false);
    }
  }, [cars.length, isSearchData]);

  // Reset flags when new search params come
  useEffect(() => {
    if (isSearchData) {
      setSearchInput("");
      setHasSearched(false); // Reset search flag on new query
    }
  }, [pickupLocation, pickupDate, returnDate]);

  // Local filtering
  const filtered = useMemo(() => {
    if (!debouncedInput || isSearchData) return filteredCars;

    return cars.filter((car) => {
      const fields = [
        car.brand,
        car.model,
        car.category,
        car.transmission,
        car.fuelType,
        car.location,
      ];
      return fields.some((field) =>
        field.toLowerCase().includes(debouncedInput)
      );
    });
  }, [debouncedInput, cars, filteredCars, isSearchData]);

  // Apply filtered locally
  useEffect(() => {
    if (!isSearchData && cars.length) {
      setFilteredCars(filtered);
    }
  }, [filtered, isSearchData, cars.length]);

  const searchCarAvailability = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/bookings/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      if (data?.success) {
        setFilteredCars(data.availableCars);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Error while searching");
    } finally {
      setLoading(false);
    }
  };

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
            placeholder="Search by make, model or features..."
            aria-label="Search cars"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <CarCardSkeleton key={i} />
              ))}
          </div>
        ) : (
          <>
            <p className="font-medium text-gray-400 xl:px-20 max-w-7xl mx-auto">
              Showing {filtered.length} {filtered.length === 1 ? "Car" : "Cars"}
            </p>

            {filtered.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
                {filtered.map((car, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    key={car._id || i}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1 }}
                className="mt-5 md:mt-12 px-6 py-16 text-center w-full bg-primary/10 rounded-md text-primary"
              >
                <h1
                  className="text-xl md:text-5xl font-semibold uppercase"
                  style={{
                    textShadow: "1px 1px 2px rgba(114, 141, 240, 0.6)",
                  }}
                >
                  Sorry No Cars Available
                </h1>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Cars;
