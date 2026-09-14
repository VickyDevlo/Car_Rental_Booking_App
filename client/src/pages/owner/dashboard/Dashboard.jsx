import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Title } from "../../../components/owner/Title";
import { assets, initialDashboardData } from "../../../assets/assets";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { TitleSkeleton } from "../../../components/shared/TitleSkeleton";
import { DashboardSkeleton } from "../../../components/shared/DashboardSkeleton";
import { formatCurrency } from "../../../utils/formatCurrency";
import RevenueChart from "../../../components/owner/dashboard/RevenueChart";
import BookingStatusChart from "../../../components/owner/dashboard/BookingStatusChart";

const STATUS_COLORS = {
  confirmed: "#16a34a",
  pending: "#d97706",
  cancelled: "#dc2626",
};

const RANGE_OPTIONS = [
  { label: "7 days", value: 7 },
  { label: "30 days", value: 30 },
  { label: "90 days", value: 90 },
  { label: "All time", value: "all" },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initialDashboardData);
  const [range, setRange] = useState(30);
  const [statusFilter, setStatusFilter] = useState("all");
  const { isOwner, currency, token, axios } = useAppContext();

  const dashboardCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ];

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data?.success) {
        setData(data?.dashboardData);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = useMemo(() => {
    const bookings = data?.recentBookings ?? [];
    const now = new Date();
    return bookings.filter((b) => {
      const matchesStatus =
        statusFilter === "all" ? true : b.status === statusFilter;
      if (!matchesStatus) return false;
      if (range === "all") return true;
      const created = new Date(b.createdAt);
      const days = (now - created) / (1000 * 60 * 60 * 24);
      return days <= range;
    });
  }, [data?.recentBookings, range, statusFilter]);

  const statusBreakdown = useMemo(() => {
    const bookings = data?.recentBookings ?? [];
    const counts = bookings.reduce((acc, b) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([status, count]) => ({
      name: status,
      value: count,
    }));
  }, [data?.recentBookings]);

  const revenueTrend = useMemo(() => {
    if (Array.isArray(data?.revenueTrend) && data.revenueTrend.length) {
      return data.revenueTrend;
    }
    return [{ month: "This month", revenue: data?.monthlyRevenue ?? 0 }];
  }, [data?.revenueTrend, data?.monthlyRevenue]);

  useEffect(() => {
    if (token && isOwner) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchDashboardData();
    }
  }, [token, isOwner]);

  return (
    <div className="px-4 pt-3 md:pt-10 md:px-10 flex-1 mb-12">
      {loading ? (
        <TitleSkeleton />
      ) : (
        <Title
          title="Admin Dashboard"
          subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
        />
      )}

      {!loading ? (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 mb-6 w-full">
            {dashboardCards.map((card, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border ${card.borderColor} ${card.bgColor}`}
              >
                <div className="flex items-center justify-center shrink-0 rounded-lg w-9 h-9 sm:w-11 sm:h-11 bg-white/60">
                  <img
                    src={card.icon}
                    alt=""
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {card.title}
                  </p>
                  <p className="text-xl sm:text-2xl font-semibold text-gray-800 mt-0.5">
                    {card.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="flex items-stretch gap-4 flex-wrap mb-6 w-full">
            <RevenueChart
              data={data}
              revenueTrend={revenueTrend}
              currency={currency}
            />

            <BookingStatusChart statusBreakdown={statusBreakdown} />
          </div>

          {/* Recent bookings */}
          <div className="p-5 md:p-6 border border-borderColor rounded-xl bg-white w-full max-w-3xl">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="font-semibold text-gray-800">Recent bookings</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Latest customer bookings
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={range}
                  onChange={(e) => {
                    const val = e.target.value;
                    setRange(val === "all" ? "all" : Number(val));
                  }}
                  className="text-sm border border-borderColor rounded-md px-2.5 py-1.5 text-gray-600 bg-white"
                >
                  {RANGE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-sm border border-borderColor rounded-md px-2.5 py-1.5 text-gray-600 bg-white capitalize"
                >
                  <option value="all">All statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {filteredBookings.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-10">
                No bookings match these filters.
              </p>
            ) : (
              filteredBookings.map((booking, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-t border-borderColor first:border-t-0 first:pt-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 overflow-hidden shrink-0">
                      <img
                        src={booking?.car?.image}
                        alt="car"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 font-medium max-sm:truncate max-sm:w-[110px]">
                        {booking.car.brand} {booking.car.model}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {booking.createdAt.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="max-sm:hidden text-sm text-gray-700">
                      {formatCurrency(
                        booking.price,
                        currency === "$" ? "USD" : currency,
                      )}
                    </p>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        booking?.status === "confirmed"
                          ? "bg-green-500/10 text-green-600"
                          : booking?.status === "pending"
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <DashboardSkeleton />
      )}
    </div>
  );
};

export default Dashboard;
