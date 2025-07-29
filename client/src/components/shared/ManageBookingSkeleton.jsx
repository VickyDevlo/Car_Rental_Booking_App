export const ManageBookingSkeleton = () => {
  return (
    <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor my-6 animate-pulse">
      <table className="w-full border-collapse text-left text-sm text-gray-600">
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
            <tr key={i} className="border-t border-borderColor text-gray-500">
              <td className="p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-md bg-gray-200" />
                <div className="w-24 h-4 bg-gray-200 rounded max-md:hidden" />
              </td>
              <td className="p-3 max-md:hidden">
                <div className="w-28 h-4 bg-gray-200 rounded" />
              </td>
              <td className="p-3">
                <div className="w-12 h-4 bg-gray-200 rounded" />
              </td>
              <td className="p-3 max-md:hidden">
                <div className="w-16 h-4 bg-gray-200 rounded" />
              </td>
              <td className="p-3">
                <div className="w-20 h-6 bg-gray-200 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
