import { assets } from "../../assets/assets";

const Banner = () => {
  return (
    <div
      className="flex flex-col md:flex-row md:items-start items-center gap-4
    justify-between px-8 min-md:pl-14 pt-10 pb-5 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
    >
      <div className="text-white">
        <h2 className="text-lg max-md:text-center md:text-3xl font-bold">Do You Own a Luxcury Car?</h2>
        <p className="mt-2">
          Monetize your vehicle effortlessly by listing it on CarRental.
        </p>
        <p className="max-w-[600px] w-full mt-2">
          We take care of insurance, driver verification and secure payments —
          so you can earn passive income, stress-free.
        </p>
        <button className="px-6 py-2 bg-white text-primary rounded-lg text-sm mt-4 cursor-pointer hover:bg-slate-100 transition-all">
          List your car
        </button>
      </div>
      <img src={assets.banner_car_image} alt="car" className="max-h-44 max-md:mt-5" />
    </div>
  );
};

export default Banner;
