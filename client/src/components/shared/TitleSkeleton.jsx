
export const TitleSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 w-full animate-pulse">
          <div className="h-7 md:h-10 w-52 md:w-80 bg-gray-200 rounded" />
          <div className="h-4 max-w-xl bg-gray-200 rounded mt-2" />
          <div className="h-4 w-56 md:w-96 bg-gray-200 rounded" />
        </div>
  )
}
