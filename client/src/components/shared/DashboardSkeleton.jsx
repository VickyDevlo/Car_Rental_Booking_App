export const DashboardSkeleton = () => {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl w-full animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-2 px-4 py-3 rounded-md border border-borderColor bg-light"
          >
            <div className="space-y-2">
              <div className="w-18 h-2 max-sm:w-30 bg-gray-200 rounded" />
              <div className="w-9 h-9 bg-gray-300 rounded-full" />
            </div>
            <div className="flex items-center justify-center rounded-full w-10 h-10 bg-gray-200 shrink-0" />
          </div>
        ))}
      </div>

      <div className="flex items-start gap-6 flex-wrap mb-8 w-full animate-pulse">
        <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
          <div className="h-6 bg-gray-300 rounded mb-2 w-1/2" />
          <div className="h-4 bg-gray-200 rounded mb-6 w-2/3" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between mt-4 animate-pulse"
            >
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gray-200" />
                <div>
                  <div className="h-4 bg-gray-200 rounded w-[80px] sm:w-[120px] mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-[100px]" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="max-sm:hidden h-4 bg-gray-200 rounded w-[50px]" />
                <div
                  className="h-6 bg-gray-200 rounded-full w-[70px] 
                sm:w-[100px]"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md h-fit md:max-w-xs w-full">
          <div className="h-6 bg-gray-300 rounded mb-2 w-40" />
          <div className="h-4 bg-gray-200 rounded mb-6 w-42" />
          <div className="h-10 bg-gray-300 rounded w-20" />
        </div>
      </div>
    </>
  );
};