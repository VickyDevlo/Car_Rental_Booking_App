export const ManageCarsSkeleton = () => {
  return (
    <table className="w-full border-collapse text-left text-sm text-gray-600 animate-pulse">
      <thead className="text-gray-500">
        <tr>
          <th className="p-3">
            <div className="h-4 w-13 md:w-20 bg-gray-200 rounded" />
          </th>
          <th className="p-3 max-md:hidden">
            <div className="h-4 w-13 md:w-20 bg-gray-200 rounded" />
          </th>
          <th className="p-3">
            <div className="h-4 w-13 md:w-20 bg-gray-200 rounded" />
          </th>
          <th className="p-3">
            <div className="h-4 w-13 md:w-20 bg-gray-200 rounded" />
          </th>
          <th className="p-3 max-md:hidden">
            <div className="h-4 w-13 md:w-20 bg-gray-200 rounded" />
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(3)].map((_, i) => (
          <tr key={i} className="border-t border-borderColor">
            <td className="flex items-center gap-2 p-3">
              <div className="md:w-12 md:h-12 w-10 h-10 bg-gray-200 rounded-md" />
              <div className="space-y-1 max-md:hidden">
                <div className="w-24 h-4 bg-gray-200 rounded" />
                <div className="w-20 h-3 bg-gray-200 rounded" />
              </div>
            </td>
            <td className="p-3 font-medium max-md:hidden">
              <div className="w-20 h-4 bg-gray-200 rounded" />
            </td>
            <td className="p-3 font-medium">
              <div className="w-16 h-4 bg-gray-200 rounded" />
            </td>
            <td className="p-3 font-medium">
              <div className="w-20 h-6 bg-gray-200 rounded-full" />
            </td>
            <td className="max-md:hidden p-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
