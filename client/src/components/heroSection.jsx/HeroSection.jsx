import React, { useState } from "react";
import { assets, cityList } from "../../assets/assets";

const HeroSection = () => {
  const today = new Date().toISOString().split("T")[0];

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickDate] = useState("");
  const [returnDate, setReturnDate] = useState(today);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen flex flex-col items-center gap-4 md:gap-8 bg-light text-center">
      <h1 className="text-3xl mt-4 md:text-5xl font-semibold">
        Luxury cars on Rent
      </h1>

      <form
        onSubmit={submitHandler}
        className="flex flex-col md:flex-row items-start md:items-center 
      justify-between p-3 rounded-lg md:rounded-full max-w-80 md:max-w-[850px] w-full
      bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)] "
      >
        <div className="flex flex-col md:flex-row items-center max-md:gap-7 gap-10 min-md:ml-8 w-full ">
          <div className="flex flex-col items-start max-sm:items-center max-sm:w-full gap-2 md:border-r border-gray-300 px-2">
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="focus:outline-none "
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p
              className="text-sm text-neutral-500 bg-white px-2 py-1
            max-sm:border border-borderColor rounded"
            >
              {pickupLocation ? pickupLocation : "Select location"}
            </p>
          </div>
          <div className="flex flex-col items-start max-sm:items-center max-sm:w-full gap-2 md:border-r border-gray-300 md:px-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              id="pickup-date"
              min={today}
              onChange={(e) => setPickDate(e.target.value)}
              className="text-sm text-gray-800 focus:outline py-1 max-sm:border border-borderColor rounded"
              required
            />
          </div>
          <div className="flex flex-col items-start max-sm:items-center max-sm:w-full gap-2 md:border-r border-gray-300 md:px-2">
            <label htmlFor="return-date">Retrun Date</label>
            <input
              type="date"
              id="return-date"
              min={today}
              className="text-sm text-gray-800 bg-white focus:outline-none py-1
              max-sm:border border-borderColor rounded"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className=" flex items-center justify-center gap-1 text-white
              px-9 py-3 max-md:mt-4 max-md:w-full bg-primary hover:bg-primary-dull rounded-full cursor-pointer transition-all"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-200"
          />
          Search
        </button>
      </form>

      <img src={assets.main_car} alt="car" className="max-h-74" />
    </div>
  );
};

export default HeroSection;
