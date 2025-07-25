export const CarCardSkeleton = () => {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-md bg-white animate-pulse"
    >
      {/* Image Skeleton */}
      <div className="relative h-48 sm:h-52 w-full bg-gray-200" />

      {/* Info Skeleton */}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="text-center space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {Array(4).fill(0).map((_, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <div className="h-4 w-4 bg-gray-300 rounded" />
              <div className="h-3 bg-gray-300 rounded w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
