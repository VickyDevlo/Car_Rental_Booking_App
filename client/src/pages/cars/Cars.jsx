import { useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";
import { CarCard, Loader, Title } from "../../components";

const Cars = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="mt-8 md:mt-12">
      <div className="flex flex-col items-center py-20 max-md:px-4 bg-light">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />
        <div className="bg-white flex items-center px-4 h-12 mt-6 max-w-xl w-full rounded-full shadow-lg">
          <img src={assets.search_icon} alt="search" className="w-4 h-4 mr-2" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by make model or features..."
            className="text-gray-600 w-full h-full font-medium focus:outline-none max-md:placeholder:text-sm truncate"
          />
          <img
            src={assets.filter_icon}
            alt="filter"
            className="w-4 h-4 ml-2 cursor-pointer"
          />
        </div>
      </div>
      {dummyCarData ? (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
          <p className="font-medium text-gray-400 xl:px-20 max-w-7xl mx-auto">
            Showing {dummyCarData.length} cars
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
            {dummyCarData.map((car, i) => (
              <div key={i} className="">
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Cars;
