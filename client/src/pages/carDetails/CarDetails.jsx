import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Loader } from "../../components";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { CarDetailsSkeleton } from "../../components/shared/CarDetailsSkeleton";
import { formatCurrency } from "../../utils/formatCurrency";
import { DateField, toInputDate, countDays } from "../../shared/DateField";

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

  const today = toInputDate(new Date());
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const { id } = useParams();

  const days = countDays(pickupDate, returnDate);
  const formatPrice = (amount) =>
    formatCurrency(amount, currency === "$" ? "USD" : currency);
  const total = (car?.pricePerDay || 0) * days;

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickupDate(value);
    // Never leave a return date that is earlier than the new pickup date
    if (returnDate && returnDate < value) setReturnDate("");
  };

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
        window.scrollTo({ top: 0, behavior: "smooth" });
        setPickupDate("");
        setReturnDate("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Access denied. Please log in or register to continue.");
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    const loadCar = () => {
      setLoading(true);

      // Check if car exists in context
      const found = cars.find((c) => c._id === id);
      if (found) {
        setCar(found);
        localStorage.setItem("selectedCar", JSON.stringify(found));
        setLoading(false);
        return;
      }

      // Check localStorage fallback
      const stored = localStorage.getItem("selectedCar");
      try {
        const parsed = JSON.parse(stored);
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

      setLoading(false);
    };

    loadCar();
  }, [cars, id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isDisabled = !pickupDate || !returnDate;

  return loading ? (
    <CarDetailsSkeleton />
  ) : (
    <div className="container mx-auto px-6 md:px-12 lg:px-14 xl:px-20 my-12">
      <button
        onClick={() => {
          navigate("/cars");
          window.scrollTo({ top: 0, behavior: "smooth" });
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
                  <span className="text-center text-sm">{text}</span>
                </div>
              ))}
            </div>
            <div>
              <h1 className="text-xl font-semibold mb-3">Description</h1>
              <p className="text-gray-500">{car?.description}</p>
            </div>
            <div>
              <h1 className="text-xl font-semibold mb-3">Features</h1>
              <ul className="grid grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Mirror",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center text-gray-500 font-medium 
                    capitalize"
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

        {/* Booking card */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="h-max space-y-2 rounded-2xl border border-borderColor bg-white p-6 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18)] lg:sticky lg:top-10"
        >
          {/* Price */}
          <div>
            <p className="text-sm font-medium text-gray-500">Price</p>
            <p className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                {formatPrice(car?.pricePerDay)}
              </span>
              <span className="text-xs text-gray-500">/ day</span>
            </p>
          </div>

          {/* Dates */}
          <div className="space-y-2 border-t border-borderColor pt-6 text-gray-600">
            <p className="text-sm font-semibold text-gray-900">
              Select your rental dates
            </p>

            <DateField
              variant="form"
              id="pickup-date"
              label="Pickup Date"
              placeholder="Add pickup date"
              min={today}
              value={pickupDate}
              onChange={handlePickupChange}
            />

            <DateField
              variant="form"
              id="return-date"
              label="Return Date"
              placeholder="Add return date"
              min={pickupDate || today}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          {/* Price summary (fixed structure so the card doesn't jump) */}
          <div className="rounded-xl bg-light p-4 text-sm" aria-live="polite">
            {days > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-t border-borderColor pt-3">
                  <span className="font-semibold text-gray-900">
                    Estimated total
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Pick your dates to see the total
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <motion.button
              whileTap={isDisabled || formLoading ? undefined : { scale: 0.98 }}
              type="submit"
              disabled={isDisabled || formLoading}
              className="w-full cursor-pointer rounded-xl bg-primary py-3.5 text-base font-semibold text-white transition-colors enabled:hover:bg-primary-dull disabled:cursor-not-allowed disabled:opacity-50"
            >
              {formLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="h-6 w-6 border-2" />
                  Booking...
                </div>
              ) : (
                "Book now"
              )}
            </motion.button>

            <p className="flex items-center justify-center gap-2 text-xs font-medium text-gray-500">
              <img src={assets.check_icon} alt="" className="h-3.5" />
              No credit card required to reserve
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CarDetails;
