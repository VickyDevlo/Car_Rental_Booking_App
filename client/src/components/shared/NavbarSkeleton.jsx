export const NavbarSkeleton = () => {
  return (
    <div className="container mx-auto flex items-center justify-between gap-2 px-6 md:px-16 lg:px-24 xl:px-32 max-sm:py-2 py-4 w-full">
      {/* Logo */}
      <div className="h-8 w-32 bg-gray-200 animate-pulse rounded shrink-0" />

      {/* Desktop Menu */}
      <div className="hidden sm:flex justify-end items-center gap-2 w-full">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-6 w-16 bg-gray-200 animate-pulse rounded"
            />
          ))}

        {/* Search */}
        <div className="h-8 w-56 bg-gray-200 animate-pulse rounded-full" />
      </div>

      {/* Buttons */}
      <div className="hidden sm:flex items-center gap-4">
        <div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
        <div className="h-9 w-20 bg-gray-200 animate-pulse rounded" />
      </div>

      {/* Mobile Menu Icon */}
      <div className="sm:hidden">
        <div className="h-6 w-6 bg-gray-200 animate-pulse rounded" />
      </div>
      {/* Mobile Menu */}
      <div
        className={`sm:hidden px-6 pt-2 pb-4 transition-all`}
      >
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-6 w-full bg-gray-200 animate-pulse rounded mb-2"
            />
          ))}
        <div className="h-10 w-full bg-gray-200 animate-pulse rounded-full mb-2" />
        <div className="h-9 w-full bg-gray-200 animate-pulse rounded mb-2" />
        <div className="h-9 w-full bg-gray-200 animate-pulse rounded" />
      </div>
    </div>
  );
};
