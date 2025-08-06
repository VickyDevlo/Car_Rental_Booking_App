export const FeatureSectionSkeleton = () => {
  const skeletons = Array(6).fill(null);

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl overflow-hidden shadow-md bg-white p-4 sm:p-5 space-y-3"
        >
          {/* Image Skeleton */}
          <div className="relative h-48 sm:h-52 w-full bg-gray-200 rounded-xl" />

          {/* Title */}
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto" />
          {/* Subtitle */}
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-300 rounded-full mr-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-300 rounded-full mr-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-300 rounded-full mr-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-300 rounded-full mr-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
