import { useEffect, useState } from "react";
import { Title } from "../../../components/owner/Title";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { NotAvailableMsg } from "../../../components/shared/NotAvailableMsg";
import { TitleSkeleton } from "../../../components/shared/TitleSkeleton";

const ManageBooking = () => {
  const { currency, axios, token, isOwner } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchOwnerBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/bookings/owner");
      if (data?.success) {
        setBookings(data?.bookings);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  const checkBookingStatus = async (bookingId, newStatus) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", {
        bookingId,
        status: newStatus,
      });
      if (data?.success) {
        toast.success(data?.message);
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

   useEffect(() => {
    // ✅ Only fetch dashboard when token and isOwner are set
    if (token && isOwner) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchOwnerBookings();
    }
  }, [token, isOwner]); // 🔁 Refetch if either updates

  return (
    <div className="px-4 pt-3 md:pt-10 md:px-10 w-full">
      {!loading ? (
        <Title
          title="Manage Bookings"
          subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
        />
      ) : (
        <TitleSkeleton />
      )}

      {loading ? (
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
                <tr
                  key={i}
                  className="border-t border-borderColor text-gray-500"
                >
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
      ) : hasFetched && bookings.length === 0 ? (
        <NotAvailableMsg message="No Bookings Available" />
      ) : bookings.length > 0 ? (
        <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor my-6">
          <table className="w-full border-collapse text-left text-sm text-gray-600">
            <thead className="text-gray-500">
              <tr>
                <th className="p-3 font-medium">Car</th>
                <th className="p-3 font-medium max-md:hidden">Date Range</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium max-md:hidden">Payment</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, i) => (
                <tr
                  key={i}
                  className="border-t border-borderColor text-gray-500"
                >
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={booking?.car?.image}
                      alt="car_image"
                      className="md:w-12 md:h-12 aspect-square rounded-md object-cover"
                    />
                    <p className="font-medium max-md:hidden">
                      {booking?.car?.brand} {booking?.car?.model}
                    </p>
                  </td>
                  <td className="p-3 max-md:hidden">
                    {booking?.pickupDate.split("T")[0]} to{" "}
                    {booking?.returnDate.split("T")[0]}
                  </td>
                  <td className="p-3">
                    {currency}
                    {booking?.price}
                  </td>
                  <td className="p-3 max-md:hidden">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                      Offline
                    </span>
                  </td>
                  <td className="p-3">
                    {booking?.status === "pending" ? (
                      <select
                        value={booking?.status}
                        onChange={(e) =>
                          checkBookingStatus(booking?._id, e.target.value)
                        }
                        className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md text-xs outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          booking?.status === "confirmed"
                            ? "bg-green-100 text-green-500"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {booking?.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default ManageBooking;
