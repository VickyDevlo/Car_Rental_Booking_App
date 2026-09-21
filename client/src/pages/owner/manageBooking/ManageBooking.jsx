import { useEffect, useState } from "react";
import { Title } from "../../../components/owner/Title";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { NotAvailableMsg } from "../../../components/shared/NotAvailableMsg";
import { TitleSkeleton } from "../../../components/shared/TitleSkeleton";
import { ManageBookingSkeleton } from "../../../components/shared/ManageBookingSkeleton";
import { formatCurrency } from "../../../utils/formatCurrency";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "cancelled", label: "Cancelled" },
];

const STATUS_STYLES = {
  pending: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
  },
  confirmed: {
    badge: "bg-green-50 text-green-700 ring-green-200",
    dot: "bg-green-500",
  },
  cancelled: {
    badge: "bg-red-50 text-red-600 ring-red-200",
    dot: "bg-red-500",
  },
};

// "2026-09-21T00:00:00.000Z" -> local Date (ignores the time part, no timezone shift)
const parseDate = (value) => {
  if (!value) return null;
  const [y, m, d] = String(value).split("T")[0].split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const formatRange = (start, end) => {
  const s = parseDate(start);
  const e = parseDate(end);
  if (!s || !e) return "-";
  const sameYear = s.getFullYear() === e.getFullYear();
  const short = { day: "numeric", month: "short" };
  const startText = s.toLocaleDateString(
    undefined,
    sameYear ? short : { ...short, year: "numeric" },
  );
  const endText = e.toLocaleDateString(undefined, {
    ...short,
    year: "numeric",
  });
  return `${startText} – ${endText}`;
};

const countDays = (start, end) => {
  const s = parseDate(start);
  const e = parseDate(end);
  if (!s || !e) return 0;
  const diff = Math.round(
    (Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()) -
      Date.UTC(s.getFullYear(), s.getMonth(), s.getDate())) /
      86400000,
  );
  return diff < 0 ? 0 : Math.max(diff, 1);
};

/* ------------------------------------------------------------------ */
/* Small presentational pieces                                         */
/* ------------------------------------------------------------------ */

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || {
    badge: "bg-gray-100 text-gray-600 ring-gray-200",
    dot: "bg-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
};

const PaymentPill = () => (
  <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
    Offline
  </span>
);

const BookingActions = ({ booking, busy, onChange }) => {
  // Only pending bookings can be acted on.
  if (booking?.status !== "pending") {
    return <span className="text-gray-300">-</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={busy}
        onClick={() => onChange(booking._id, "confirmed")}
        className="cursor-pointer rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Confirm
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() => onChange(booking._id, "cancelled")}
        className="cursor-pointer rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cancel
      </button>
    </div>
  );
};

const CarThumb = ({ booking, className = "h-12 w-12" }) => (
  <img
    src={booking?.car?.image}
    alt={
      `${booking?.car?.brand ?? ""} ${booking?.car?.model ?? ""}`.trim() ||
      "Car"
    }
    className={`${className} shrink-0 rounded-lg bg-gray-100 object-cover`}
  />
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const ManageBooking = () => {
  const { currency, axios, token, isOwner } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const formatPrice = (price) =>
    formatCurrency(price, currency === "$" ? "USD" : currency);

  const fetchOwnerBookings = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/bookings/owner");
      if (data?.success) {
        setBookings(data?.bookings || []);
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
    setUpdatingId(bookingId);
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
              : booking,
          ),
        );
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleStatusChange = (bookingId, newStatus) => {
    // Once cancelled, the UI offers no way back, so ask first.
    if (
      newStatus === "cancelled" &&
      !window.confirm(
        "Cancel this booking? You won't be able to change its status afterwards.",
      )
    ) {
      return;
    }
    checkBookingStatus(bookingId, newStatus);
  };

  useEffect(() => {
    if (token && isOwner) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchOwnerBookings();
    }
  }, [token, isOwner]);

  // Counts for the filter tabs
  const counts = {
    all: bookings.length,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  };
  bookings.forEach((b) => {
    if (counts[b.status] !== undefined) counts[b.status] += 1;
  });

  const visibleBookings =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="w-full px-4 pb-10 pt-3 md:px-10 md:pt-10">
      {!loading ? (
        <Title
          title="Manage Bookings"
          subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
        />
      ) : (
        <TitleSkeleton />
      )}

      {loading ? (
        <ManageBookingSkeleton />
      ) : hasFetched && bookings.length === 0 ? (
        <NotAvailableMsg message="No Bookings Available" />
      ) : bookings.length > 0 ? (
        <div className="my-6 w-full max-w-5xl">
          {/* Filter tabs */}
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map(({ key, label }) => {
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(key)}
                  className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-borderColor bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {label}
                  <span
                    className={`rounded-full px-1.5 text-xs ${
                      active
                        ? "bg-white/20 text-white"
                        : key === "pending" && counts.pending > 0
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {counts[key]}
                  </span>
                </button>
              );
            })}
          </div>

          {visibleBookings.length === 0 ? (
            <div className="rounded-xl border border-dashed border-borderColor bg-white py-14 text-center text-sm text-gray-500">
              No {filter} bookings.
            </div>
          ) : (
            <>
              {/* Cards: phones and tablets */}
              <ul className="grid gap-3 lg:hidden">
                {visibleBookings.map((booking) => {
                  const days = countDays(
                    booking?.pickupDate,
                    booking?.returnDate,
                  );
                  return (
                    <li
                      key={booking._id}
                      className={`rounded-xl border border-borderColor p-4 shadow-sm ${
                        booking?.status === "pending"
                          ? "bg-amber-50/40"
                          : "bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <CarThumb booking={booking} className="h-14 w-14" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-gray-900">
                            {booking?.car?.brand} {booking?.car?.model}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {formatRange(
                              booking?.pickupDate,
                              booking?.returnDate,
                            )}
                          </p>
                          {days > 0 && (
                            <p className="text-xs text-gray-400">
                              {days} {days === 1 ? "day" : "days"}
                            </p>
                          )}
                        </div>
                        <StatusBadge status={booking?.status} />
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-borderColor pt-3">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="text-xs text-gray-500">Total</p>
                            <p className="font-semibold text-gray-900">
                              {formatPrice(booking?.price)}
                            </p>
                          </div>
                          <PaymentPill />
                        </div>
                        {booking?.status === "pending" && (
                          <BookingActions
                            booking={booking}
                            busy={updatingId === booking._id}
                            onChange={handleStatusChange}
                          />
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Table: large screens */}
              <div className="hidden overflow-x-auto rounded-xl border border-borderColor bg-white shadow-sm lg:block">
                <table className="w-full border-collapse text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-xs text-gray-500">
                    <tr>
                      <th className="px-5 py-3 font-medium">Car</th>
                      <th className="px-5 py-3 font-medium">Dates</th>
                      <th className="px-5 py-3 font-medium">Total</th>
                      <th className="hidden px-5 py-3 font-medium xl:table-cell">
                        Payment
                      </th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleBookings.map((booking) => {
                      const days = countDays(
                        booking?.pickupDate,
                        booking?.returnDate,
                      );
                      return (
                        <tr
                          key={booking._id}
                          className={`border-t border-borderColor transition-colors hover:bg-gray-50 ${
                            booking?.status === "pending"
                              ? "bg-amber-50/40"
                              : ""
                          }`}
                        >
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <CarThumb booking={booking} />
                              <p className="font-medium text-gray-900">
                                {booking?.car?.brand} {booking?.car?.model}
                              </p>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <p className="whitespace-nowrap text-gray-900">
                              {formatRange(
                                booking?.pickupDate,
                                booking?.returnDate,
                              )}
                            </p>
                            {days > 0 && (
                              <p className="text-xs text-gray-400">
                                {days} {days === 1 ? "day" : "days"}
                              </p>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-5 py-3 font-semibold text-gray-900">
                            {formatPrice(booking?.price)}
                          </td>
                          <td className="hidden px-5 py-3 xl:table-cell">
                            <PaymentPill />
                          </td>
                          <td className="px-5 py-3">
                            <StatusBadge status={booking?.status} />
                          </td>
                          <td className="px-5 py-3">
                            <BookingActions
                              booking={booking}
                              busy={updatingId === booking._id}
                              onChange={handleStatusChange}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ManageBooking;
