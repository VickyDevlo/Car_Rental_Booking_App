import { Title } from "../../components";

const Newsletter = () => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center space-y-2
    my-10 max-md:px-4 mb-20"
    >
      <Title
        title="Never Miss a Deal!"
        subTitle=" Subscribe to get the latest offers, new arrivals, and exclusive
        discounts"
      />
      <form className="flex items-center justify-between max-w-2xl mt-8 w-full md:h-13 h-12">
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 
          outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary
           hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
