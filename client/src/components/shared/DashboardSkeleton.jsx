export const DashboardSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 mb-6 w-full">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-5 rounded-xl border border-borderColor bg-white"
          >
            {/* Icon */}
            <div className="shrink-0 w-11 h-11 rounded-lg bg-gray-200" />

            {/* Content */}
            <div className="flex-1">
              <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
              <div className="h-7 w-12 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="flex items-stretch gap-4 flex-wrap mb-6 w-full">
        {/* Revenue Chart Skeleton */}
        <div className="p-5 md:p-6 border border-borderColor rounded-xl bg-white flex-1 min-w-[320px]">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="h-5 w-32 bg-gray-300 rounded mb-2" />
              <div className="h-3 w-28 bg-gray-200 rounded" />
            </div>

            {/* Revenue */}
            <div className="h-6 w-24 bg-gray-300 rounded" />
          </div>

          {/* Chart */}
          <div className="h-56 mt-4 flex items-end gap-2 px-2">
            {[40, 65, 50, 80, 55, 75, 60, 90, 70, 85, 55, 75].map(
              (height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gray-200 rounded-t"
                  style={{ height: `${height}%` }}
                />
              )
            )}
          </div>
        </div>

        {/* Bookings Status Skeleton */}
        <div className="p-5 md:p-6 border border-borderColor rounded-xl bg-white w-full md:max-w-xs">
          {/* Header */}
          <div className="h-5 w-36 bg-gray-300 rounded mb-2" />
          <div className="h-3 w-44 bg-gray-200 rounded mb-4" />

          {/* Donut */}
          <div className="h-44 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-[18px] border-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-3 bg-gray-300 rounded" />
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <div className="h-3 w-14 bg-gray-200 rounded" />
                <div className="h-3 w-4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="p-5 md:p-6 border border-borderColor rounded-xl bg-white w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="h-5 w-32 bg-gray-300 rounded mb-2" />
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-20 bg-gray-200 rounded-md" />
            <div className="h-8 w-28 bg-gray-200 rounded-md" />
          </div>
        </div>

        {/* Booking Rows */}
        <div className="mt-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-t border-borderColor"
            >
              {/* Car + Details */}
              <div className="flex items-center gap-3">
                {/* Car Image */}
                <div className="hidden md:block w-11 h-11 rounded-lg bg-gray-200 shrink-0" />

                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Price + Status */}
              <div className="flex items-center gap-3">
                {/* Price */}
                <div className="hidden sm:block h-4 w-16 bg-gray-200 rounded" />

                {/* Status */}
                <div className="h-6 w-20 bg-gray-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

