import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Loader } from "../../components";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const CarDetails = () => {
  const {
    currency,
    axios,
    cars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    navigate,
  } = useAppContext();

  const today = new Date().toISOString().split("T")[0];
  const [car, setCar] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });

      if (data?.success) {
        toast.success(data?.message);
        navigate("/my-bookings");
        setPickupDate("");
        setReturnDate("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Not Authorized");
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    const loadCar = () => {
      setPageLoading(true);

      // Check if car exists in context
      const found = cars.find((c) => c._id === id);
      if (found) {
        setCar(found);
        localStorage.setItem("selectedCar", JSON.stringify(found));
        setPageLoading(false);
        return;
      }

      // Check localStorage fallback
      const stored = localStorage.getItem("selectedCar");
      try {
        const parsed = stored ? JSON.parse(stored) : null;
        if (parsed && parsed._id === id) {
          setCar(parsed);
        } else {
          setCar(null);
          localStorage.removeItem("selectedCar");
        }
      } catch (err) {
        console.error("Invalid JSON in localStorage:", err);
        setCar(null);
        localStorage.removeItem("selectedCar");
      }

      setPageLoading(false);
    };

    loadCar();
  }, [cars, id]);

  const isDisabled = !pickupDate || !returnDate;

  if (pageLoading) {
    return (
      <div className="container mx-auto px-6 md:px-12 lg:px-14 xl:px-20 my-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 animate-pulse">
          {/* Left Side Skeleton (Image + Details) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="w-full h-80 bg-gray-300 rounded-xl"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-gray-100 p-4 rounded-lg"
                    >
                      <div className="h-5 w-5 bg-gray-300 rounded-full mb-2"></div>
                      <div className="h-3 w-16 bg-gray-300 rounded"></div>
                    </div>
                  ))}
              </div>

              <div className="space-y-2 mt-6">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>

              <div className="space-y-2 mt-6">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-3 bg-gray-200 rounded w-1/2"
                    ></div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Side Skeleton (Form) */}
          <div className="space-y-6 p-6 rounded-xl shadow-lg h-max bg-white">
            <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
            <hr className="border border-borderColor my-4" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
              <div className="h-10 bg-gray-100 w-full rounded-lg"></div>
              <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
              <div className="h-10 bg-gray-100 w-full rounded-lg"></div>
            </div>
            <div className="h-12 bg-gray-300 rounded-xl"></div>
            <div className="h-3 w-1/2 mx-auto bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-14 xl:px-20 my-12">
      <button
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img
          src={assets.arrow_icon}
          alt="back-arrow"
          className="rotate-180 opacity-65"
        />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={car?.image}
            alt={car?.brand}
            className="w-full h-auto md:max-h-96 object-cover rounded-xl mb-6 shadow-md"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-xl md:text-3xl text-gray-800 font-bold">
                {car?.brand} {car?.model}
              </h1>
              <p className="text-gray-500 text-lg font-medium uppercase">
                {car?.category} • {car?.year}
              </p>
            </div>
            <hr className="border border-borderColor my-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                car?.seatingCapacity + " Seats",
                car?.fuelType,
                car?.transmission,
                car?.location,
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center bg-light p-4 rounded-lg text-gray-500 capitalize"
                >
                  <img
                    src={
                      [
                        assets.users_icon,
                        assets.fuel_icon,
                        assets.carIcon,
                        assets.location_icon,
                      ][i]
                    }
                    alt={text}
                    className="h-5 mb-2"
                  />
                  <span className="truncate w-full text-center text-sm">
                    {text}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-xl font-semibold mb-3">Description</h1>
              <p className="text-gray-500">{car?.description}</p>
            </div>
            <div>
              <h1 className="text-xl font-semibold mb-3">Features</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Mirror",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center text-gray-500 font-medium capitalize"
                  >
                    <img
                      src={assets.check_icon}
                      alt="checked"
                      className="h-4 mr-2"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="sticky top-10 text-gray-500 p-6 space-y-6 rounded-xl shadow-lg h-max"
        >
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency} {car?.pricePerDay}
            <span className="text-base text-gray-400 font-normal capitalize">
              per day
            </span>
          </p>
          <hr className="border border-borderColor my-6" />
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              id="pickup-date"
              min={today}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="px-3 py-2 border border-borderColor rounded-lg w-full focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              min={pickupDate}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="px-3 py-2 border border-borderColor rounded-lg w-full focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isDisabled || formLoading}
            className={`text-white bg-primary w-full py-3 font-medium 
              rounded-xl capitalize hover:bg-primary-dull 
              transition-all ${
                isDisabled || formLoading
                  ? "opacity-30 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
          >
            {formLoading ? <Loader className="h-5 w-5 border-2" /> : "book now"}
          </button>
          <p className="text-xs text-center capitalize text-gray-500 font-medium">
            no credit card required to reserve
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default CarDetails;
