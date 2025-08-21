import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { formatCurrency } from "../../utils/FormatCurrency";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const handleNavigation = () => {
    navigate(`/car-details/${car?._id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onKeyDownHandler = (e) => {
    const { key } = e;
    if (key === "Enter") {
      handleNavigation();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleNavigation}
      onKeyDown={onKeyDownHandler}
      aria-label={`View details for ${car?.brand || "Car"} ${car?.model || ""}`}
      className="group rounded-2xl overflow-hidden cursor-pointer shadow-md 
        hover:shadow-xl transition-shadow duration-300 bg-white
         focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* Image Section */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden">
        <img
          src={car?.image || assets.placeholder_car}
          alt={`${car?.brand || "Unknown"} ${car?.model || "Car"}`}
          loading="lazy"
          className="w-full h-full object-cover transform transition-transform 
            duration-300 group-hover:scale-105"
        />

        {car?.isAvailable && (
          <p
            className="absolute top-3 left-3 bg-primary/90 text-white
           text-xs px-3 py-1 rounded-full shadow-sm"
          >
            Available Now
          </p>
        )}

        <div
          className="absolute bottom-3 right-3 bg-black/80 text-white
         text-xs px-3 py-1 rounded-full shadow-sm"
        >
          <span className="font-semibold">
            {formatCurrency(
              car?.pricePerDay,
              currency === "$" ? "USD" : currency
            )}
          </span>
          <span className="text-white text-xs"> / day</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 sm:p-5 space-y-2">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 capitalize truncate">
            {car?.brand || "Unknown"} {car?.model || ""}
          </h3>
          <p className="text-sm font-medium text-gray-500 uppercase">
            {car?.category || "N/A"} • {car?.year || "N/A"}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-gray-400 text-sm mt-3">
          <div className="flex items-center">
            <img src={assets.users_icon} alt="Seats" className="h-4 w-4 mr-2" />
            <span className="capitalize">
              {car?.seatingCapacity ?? "N/A"} Seats
            </span>
          </div>
          <div className="flex items-center">
            <img
              src={assets.fuel_icon}
              alt="Fuel type"
              className="h-4 w-4 mr-2"
            />
            <span className="capitalize">{car?.fuelType || "N/A"}</span>
          </div>
          <div className="flex items-center">
            <img
              src={assets.carIcon}
              alt="Transmission"
              className="h-4 w-4 mr-2"
            />
            <span className="truncate capitalize">
              {car?.transmission || "N/A"}
            </span>
          </div>
          <div className="flex items-center">
            <img
              src={assets.location_icon}
              alt="Location"
              className="h-4 w-4 mr-2"
            />
            <span className="capitalize truncate">
              {car?.location || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
