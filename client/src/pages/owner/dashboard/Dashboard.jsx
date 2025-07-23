import { useEffect, useState } from "react";
import { Title } from "../../../components/owner/Title";
import { assets } from "../../../assets/assets";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { isOwner, currency, axios } = useAppContext();

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
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      
      if (data?.success) {
        setData(data?.dashboardData);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div className="px-4 pt-3 md:pt-10 md:px-10 flex-1 mb-12">
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {dashboardCards.map((card, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-2 p-4
            rounded-md border border-borderColor bg-light"
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
      <div className="flex items-start gap-6 flex-wrap mb-8 w-full">
        {/* recent bookings */}
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
                <div className="">
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
                  className={`px-3 py-0.5 border border-borderColor rounded-full text-sm  ${
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
        {/* monthly revenue */}
        <div
          className="p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full
        md:max-w-xs"
        >
          <h1 className="text-lg font-semibold">Monthly Revenue</h1>
          <p className="text-gray-500">Revenue for current month</p>
          <p className="text-2xl md:text-3xl mt-6 font-semibold text-primary">
            {currency}
            {data?.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
