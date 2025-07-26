
export const FeatureSectionSkeleton = () => {
   const skeletons = Array(6).fill(null);
  return (
   skeletons.map((_, index) => (
              <div
                key={index}
                className="animate-pulse border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4"
              >
                <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex justify-between items-center mt-2">
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-3 items-center mt-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))
  )
}
