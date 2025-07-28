import { useEffect, useState } from "react";
import { Title } from "../../../components/owner/Title";
import { assets } from "../../../assets/assets";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import { TitleSkeleton } from "../../../components/shared/TitleSkeleton";

const Dashboard = () => {
  const { isOwner, currency, token, axios } = useAppContext();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: "",
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
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

 useEffect(() => {
    // ✅ Only fetch dashboard when token and isOwner are set
    if (token && isOwner) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchDashboardData();
    }
  }, [token, isOwner]); // 🔁 Refetch if either updates

  return (
    <div className="px-4 pt-3 md:pt-10 md:px-10 flex-1 mb-12">
      {!loading ? (
        <Title
          title="Admin Dashboard"
          subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
        />
      ) : (
        <TitleSkeleton />
      )}
      {!loading ? (
        <>
          {/* Dashboard Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
            {dashboardCards &&
              dashboardCards.map((card, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 p-4 rounded-md border border-borderColor bg-light"
                >
                  <div>
                    <h1 className="text-xs text-gray-500 font-semibold">
                      {card?.title}
                    </h1>
                    <p className="text-lg font-semibold">{card?.value}</p>
                  </div>
                  <div className="flex items-center justify-center rounded-full w-10 h-10 bg-primary/10">
                    <img
                      src={card?.icon}
                      alt={card?.title}
                      className="w-4 h-4 shrink-0"
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* Recent Bookings + Revenue */}
          <div className="flex items-start gap-6 flex-wrap mb-8 w-full">
            {/* Recent Bookings */}
            <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
              <h1 className="text-lg font-semibold text-gray-800">
                Recent Bookings
              </h1>
              <p className="text-gray-500">Latest customer bookings</p>
              {data.recentBookings.map((booking, i) => (
                <div key={i} className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <img
                        src={assets.listIconColored}
                        alt="list_icon"
                        className="h-5 w-5"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {booking.car.brand} {booking.car.model}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.createdAt.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <p className="text-sm text-gray-500">
                      {currency} {booking.price}
                    </p>
                    <p
                      className={`px-3 py-0.5 border border-borderColor rounded-full text-sm ${
                        booking?.status === "confirmed"
                          ? "bg-green-400/15 text-green-600"
                          : "bg-red-400/15 text-red-600"
                      }`}
                    >
                      {booking.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly Revenue */}
            <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs">
              <h1 className="text-lg font-semibold">Monthly Revenue</h1>
              <p className="text-gray-500">Revenue for current month</p>
              <p className="text-2xl md:text-3xl mt-6 font-semibold text-primary">
                {currency}
                {data?.monthlyRevenue}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Skeleton for cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 p-4.5 rounded-md border border-borderColor w-full bg-light"
              >
                <div className="space-y-2 w-full">
                  <div className="w-24 h-3 bg-gray-200 rounded" />
                  <div className="w-16 h-5 bg-gray-300 rounded" />
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0" />
              </div>
            ))}
          </div>

          {/* Skeleton for bookings and revenue */}
          <div className="flex flex-col md:flex-row gap-6 w-full animate-pulse">
            {/* Booking Summary Skeleton */}
            <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
              <div className="h-6 bg-gray-300 rounded mb-2 w-1/2" />
              <div className="h-4 bg-gray-200 rounded mb-6 w-2/3" />
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32" />
                      <div className="h-3 bg-gray-200 rounded w-24" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-4 bg-gray-200 rounded w-16" />
                    <div className="h-6 bg-gray-200 rounded-full w-20" />
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly Revenue Skeleton */}
            <div className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full h-fit md:max-w-xs">
              <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
              <div className="h-4 bg-gray-200 rounded mb-6 w-full" />
              <div className="h-10 bg-gray-300 rounded w-2/3" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
