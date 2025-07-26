
export const MyBookingSkeleton = () => {
  return (
    <div className="space-y-6 mt-5">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg animate-pulse"
              >
                <div className="md:col-span-1 space-y-3">
                  <div className="aspect-video bg-gray-200 rounded-md" />
                  <div className="h-5 w-3/4 bg-gray-300 rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="flex gap-2">
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                    <div className="h-6 w-20 bg-gray-300 rounded" />
                  </div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  <div className="h-4 w-1/3 bg-gray-200 rounded" />
                  <div className="h-4 w-2/5 bg-gray-200 rounded" />
                </div>
                <div className="md:col-span-1 space-y-4 text-right">
                  <div className="h-4 w-1/2 bg-gray-300 rounded ml-auto" />
                  <div className="h-6 w-1/3 bg-gray-200 rounded ml-auto" />
                  <div className="h-4 w-3/5 bg-gray-200 rounded ml-auto" />
                </div>
              </div>
            ))}
        </div>
  )
}
