export const Title = ({ title, subTitle }) => {
  return (
    <>
      <h1 className="font-semibold text-2xl md:text-4xl text-gray-800">
        {title}
      </h1>
      <p
        className="text-xs md:text-base font-medium text-gray-500/90 mt-2 
        md:max-w-xl"
      >
        {subTitle}
      </p>
    </>
  );
};
