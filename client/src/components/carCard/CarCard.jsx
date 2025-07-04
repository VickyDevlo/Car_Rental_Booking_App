import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car?._id}`);
        scrollTo(0, 0);
      }}
      className="group rounded-xl overflow-hidden cursor-pointer shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={car?.image}
          alt="car-image"
          className="w-full h-full object-cover duration-300 group-hover:scale-105"
        />

        {car?.isAvaliable && (
          <p
            className="absolute top-4 left-4 bg-primary/90 text-white text-xs
           px-2.5 py-1 rounded-full"
          >
            Avaliable Now
          </p>
        )}
        <div
          className="absolute bottom-1 right-4 text-white px-3 py-2 rounded-lg
        bg-black/80 backdrop-blur-sm"
        >
          <span className="font-semibold">
            {currency} {car?.pricePerDay}
          </span>
          <span className="text-sm text-white/80"> / day</span>
        </div>
      </div>

      <div className="p-4 sm:p05">
        <div className="flex items-start justify-center mb-2">
          <div className="">
            <h3 className="text-lg font-medium">
              {car?.brand} {car?.model}
            </h3>
            <p className="text-gray-400 text-sm">
              {car?.category} • {car?.year}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
          <div className="flex items-center  text-sm text-gray-400">
            <img src={assets.users_icon} alt="user" className="h-4 mr-1" />
            <span>{car?.seating_capacity} Seats</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <img src={assets.fuel_icon} alt="user" className="h-4 mr-1" />
            <span>{car?.fuel_type}</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <img src={assets.carIcon} alt="user" className="h-4 mr-1" />
            <span>{car?.transmission}</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <img src={assets.location_icon} alt="user" className="h-4 mr-1" />
            <span>{car?.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
