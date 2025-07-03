 const Title = ({ title, subTitle, align }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center
    ${align === "left" && "md:items-start md:text-left"} `}
    >
      <h1 className="font-semibold text-2xl md:text-4xl text-gray-800">
        {title}
      </h1>
      <p
        className="text-sm md:text-base font-medium text-gray-500/90 mt-2 
      md:w-[624px]"
      >
        {subTitle}
      </p>
    </div>
  );
};

export default Title
