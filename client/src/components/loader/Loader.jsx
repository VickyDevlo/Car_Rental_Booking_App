
const Loader = ({ className }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${className} border-gray-300 border-t-primary
      rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loader;
