import { useState } from "react";
import { assets, cityList } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { motion } from "motion/react";

const HeroSection = () => {
  const today = new Date().toISOString().split("T")[0];

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate, } =
    useAppContext();

  const [pickupLocation, setPickupLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
    setPickupLocation("");
    setPickupDate("");
    setReturnDate("");
    
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-auto flex flex-col items-center justify-center gap-4 md:gap-8
    bg-light text-center"
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-2xl mt-5 md:text-5xl text-gray-800 font-extrabold 
      uppercase tracking-widest"
      >
        Luxury cars on rent
      </motion.h1>

      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        onSubmit={handleSearch}
        className=" flex flex-col md:flex-row items-center md:items-center 
        max-md:gap-7 gap-10 w-full justify-between px-4 py-3 rounded-lg 
        md:rounded-full max-w-80 md:max-w-[850px]
        bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col md:flex-row items-center w-full gap-6 md:gap-10 min-md:ml-8">
          {/* Pickup Location */}
          <div className="flex flex-col w-full md:w-auto items-start gap-2 md:border-r border-gray-300 md:pr-4">
            <label
              htmlFor="pickup-location"
              className="text-sm font-medium text-gray-500"
            >
              Pickup Location
            </label>
            <select
              id="pickup-location"
              name="select"
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
            >
              <option value="">Select Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col w-full md:w-auto items-start gap-2 md:border-r border-gray-300 md:pr-4">
            <label
              htmlFor="pickup-date"
              className="text-sm font-medium text-gray-500"
            >
              Pickup Date
            </label>
            <input
              type="date"
              id="pickup-date"
              min={today}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
              required
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col w-full md:w-auto items-start gap-2">
            <label
              htmlFor="return-date"
              className="text-sm font-medium text-gray-500"
            >
              Return Date
            </label>
            <input
              type="date"
              id="return-date"
              min={pickupDate}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
              required
            />
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full md:w-auto flex items-center justify-center gap-2 text-white px-6 py-2 max-md:mt-2 cursor-pointer bg-primary hover:bg-primary-dull rounded-full transition-all"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="md:brightness-200 w-5 h-5 shrink-0"
          />
          Search
        </motion.button>
      </motion.form>

      <motion.img
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        src={assets.main_car}
        alt="car"
        className="max-h-74"
      />
    </motion.div>
  );
};

export default HeroSection;
