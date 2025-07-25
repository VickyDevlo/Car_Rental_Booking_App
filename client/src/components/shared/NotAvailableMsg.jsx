
export const NotAvailableMsg = ({message}) => {
  return (
    <div className="mt-10 p-1 md:p-12 flex items-center justify-center text-center w-full h-32 md:h-40 shadow-lg bg-primary/20 rounded-lg">
      <h1 className="text-xl md:text-4xl font-semibold text-gray-600">
        {message || ""}
      </h1>
    </div>
  );
};
