export const CarDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-14 xl:px-20 my-12">
          <div className="w-60 h-6 bg-gray-300 rounded flex items-center gap-2 mb-6"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 animate-pulse">
        {/* Left Side Skeleton (Image + Details) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="w-full h-80 bg-gray-300 rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-gray-100 p-4 
                    rounded-lg"
                  >
                    <div className="h-5 w-5 bg-gray-300 rounded-full mb-2"></div>
                    <div className="h-3 w-16 bg-gray-300 rounded"></div>
                  </div>
                ))}
            </div>

            <div className="space-y-2 mt-6">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>

            <div className="space-y-2 mt-6">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded w-1/2"></div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Side Skeleton (Form) */}
        <div className="space-y-6 p-6 rounded-xl shadow-lg h-max bg-white">
          <div className="flex items-center justify-between">

          <div className="h-6 bg-gray-300 w-30 rounded"></div>
          <div className="h-6 bg-gray-300 w-20 rounded"></div>
          </div>
          <hr className="border border-borderColor my-4" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
            <div className="h-10 bg-gray-100 w-full rounded-lg"></div>
            <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
            <div className="h-10 bg-gray-100 w-full rounded-lg"></div>
          </div>
          <div className="h-12 bg-gray-300 rounded-xl"></div>
          <div className="h-3 w-1/2 mx-auto bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
