import { useState } from "react";
import { Title } from "../../../components/owner/Title";
import { assets } from "../../../assets/assets";

const AddCar = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seatingCapacity: "",
    location: "",
    description: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  const isDisabled =
    !car.brand ||
    !car.model ||
    !car.year ||
    !car.pricePerDay ||
    !car.category ||
    !car.transmission ||
    !car.fuel_type ||
    !car.seatingCapacity ||
    !car.location;

  return (
    <div className="px-4 pt-3 md:pt-10 md:px-10 flex-1 mb-12">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for 
      booking, including pricing, availability, and car specifications."
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-sm text-gray-500 mt-6 max-w-xl"
      >
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />

            <input
              id="car-image"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="hidden md:block text-xs text-gray-500 font-medium">
            Upload a picture of your car
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full truncate">
            <label className="font-medium">Brand *</label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi..."
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none truncate"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium">Model *</label>
            <input
              type="text"
              placeholder="e.g. X5, E-Class, M4..."
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none truncate"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="font-medium">Year *</label>
            <input
              type="number"
              placeholder="2025"
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none truncate"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Daily Price ({currency}) *</label>
            <input
              type="number"
              placeholder="0"
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none truncate"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Category *</label>
            <select
              value={car.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none truncate"
            >
              <option value="">Select a category *</option>
              <option value="sedon">Sedon</option>
              <option value="suv">SUV</option>
              <option value="van">Van</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="font-medium">Transmission *</label>
            <select
              value={car.transmission}
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none truncate"
            >
              <option value="">Select a transmission</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
              <option value="semi-automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Fuel Type *</label>
            <select
              value={car.fuel_type}
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none truncate"
            >
              <option value="">Select a fuel type</option>
              <option value="gas">Gas</option>
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="font-medium">Seating Capacity *</label>
            <input
              type="number"
              placeholder="4"
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none truncate"
              value={car.seatingCapacity}
              onChange={(e) =>
                setCar({ ...car, seatingCapacity: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="font-medium">Location *</label>
          <select
            value={car.location}
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none truncate"
          >
            <option value="">Select a location</option>
            <option value="new york">New York</option>
            <option value="los angeles">Los Angeles</option>
            <option value="houston">Houston</option>
            <option value="chicago">Chicago</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            id="description"
            placeholder="e.g, A luxurious SUV with a specious interior and a powerful engine."
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none "
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            rows={5}
            required
          ></textarea>
        </div>
        <button
          disabled={isDisabled}
          className={`flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary
        text-white rounded-md font-medium w-max
        ${
          isDisabled
            ? "opacity-60 md:opacity-70 cursor-not-allowed"
            : "cursor-pointer"
        }`}
        >
          <img src={assets.tick_icon} alt="tick" />
          List Your Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
