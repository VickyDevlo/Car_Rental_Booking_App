import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyCarData } from "../../assets/assets";
import { Loader } from "../../components";

const CarDetails = () => {
  const today = new Date().toISOString().split("T")[0];
  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState(today);
  const [returnDate, setReturnDate] = useState(pickupDate);

  const currency = import.meta.env.VITE_CURRENCY;

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setCar(dummyCarData.find((car) => car?._id === id));
  }, [id]);

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 my-12">
      <button
        onClick={() => {
          navigate(-1);
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
        <div className="lg:col-span-2">
          <img
            src={car?.image}
            alt={car?.brand}
            className="w-full h-auto md:max-h-96 object-cover rounded-xl mb-6 shadow-md"
          />
          <div className="space-y-6">
            <div className="">
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
                {
                  icon: assets.users_icon,
                  text: `${car?.seating_capacity} Seats`,
                },
                {
                  icon: assets.fuel_icon,
                  text: car?.fuel_type,
                },
                {
                  icon: assets.carIcon,
                  text: car?.transmission,
                },
                {
                  icon: assets.location_icon,
                  text: car?.location,
                },
              ].map(({ icon, text }) => (
                <div
                  className="flex flex-col items-center bg-light p-4 rounded-lg text-gray-500"
                  key={text}
                >
                  <img src={icon} alt={text} className="h-5 mb-2" />
                  <span className="truncate w-full text-center text-sm">
                    {text}
                  </span>
                </div>
              ))}
            </div>
            <div className="">
              <h1 className="text-xl font-semibold mb-3">Description</h1>
              <p className="text-gray-500">{car?.description}</p>
            </div>
            <div className="">
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
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="sticky top-10 text-gray-500 p-6 space-y-6 rounded-xl shadow-lg h-max"
        >
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency} {car?.pricePerDay}
            <span className="text-base text-gray-400 font-normal">per day</span>
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
            className="text-white bg-primary w-full py-3 font-medium 
          rounded-xl capitalize cursor-pointer hover:bg-primary-dull 
          transition-all"
          >
            book now
          </button>
          <p className="text-xs text-center capitalize text-gray-500 font-medium">
            no credit card required to reserve
          </p>
        </form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
