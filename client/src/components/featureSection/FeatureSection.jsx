import { assets, dummyCarData } from "../../assets/assets";
import { CarCard, Title } from "../../components";
import { useNavigate } from "react-router-dom";

const FeatureSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center py-12 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="">
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {dummyCarData.slice(0, 3).map((carData) => (
          <div key={carData?._id}>
            <CarCard car={carData} />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-16 cursor-pointer"
      >
        Explore all cars
        <img src={assets.arrow_icon} alt="car" />
      </button>
    </div>
  );
};

export default FeatureSection;
