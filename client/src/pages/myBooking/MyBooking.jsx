import { useEffect, useState } from "react";
import { Title } from "../../components";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const MyBooking = () => {
  const { currency, axios, user } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data?.success) {
        setBookings(data?.bookings);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    user && fetchMyBookings();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 mx-auto md:px-16 lg:px-24 xl:px-32 2xl:px-48 my-12 text-sm max-w-7xl"
    >
      <Title
        title="My Bookings"
        subTitle="View and manage your all car bookings"
        align="left"
      />
      <>
        {bookings.length ? (
          bookings.map((booking, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              key={booking?._id}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
            >
              <div className="md:col-span-1">
                <div className="rounded-md overflow-hidden my-3">
                  <img
                    src={booking?.car?.image}
                    alt="booking_car"
                    className="w-full h-auto aspect-video object-cover"
                  />
                </div>
                <p className="text-lg font-semibold">
                  {booking?.car?.brand} {booking?.car?.model}
                </p>
                <p className="font-medium text-gray-500 uppercase">
                  {booking?.car?.category} • {booking?.car?.year} •{" "}
                  {booking?.car?.location}
                </p>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center gap-2">
                  <p className="px-3 py-1.5 bg-light font-medium text-sm rounded">
                    Booking - {i + 1}
                  </p>
                  <p
                    className={`px-3 py-1.5 font-medium text-sm rounded capitalize ${
                      booking?.status === "confirmed"
                        ? "bg-green-400/15 text-green-600"
                        : "bg-red-400/15 text-red-600"
                    }`}
                  >
                    {booking?.status}
                  </p>
                </div>
                <div className="flex items-center md:items-start gap-2 mt-3">
                  <img
                    src={assets.calendar_icon_colored}
                    alt="date"
                    className="w-4 h-4 mt-1"
                  />
                  <div className="font-medium">
                    <p className="text-gray-500">Rental Period</p>
                    <p>
                      {booking?.pickupDate.split("T")[0]} To{" "}
                      {booking?.returnDate.split("T")[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center md:items-start gap-2 mt-3">
                  <img
                    src={assets.location_icon_colored}
                    alt="date"
                    className="w-4 h-4 mt-1"
                  />
                  <div className="font-medium">
                    <p className="text-gray-500">Pickup Location</p>
                    <p>{booking?.car?.location}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1 flex flex-col justify-between gap-6">
                <div className="text-sm text-gray-500 font-medium text-right">
                  <p>Total Price</p>
                  <h1 className="text-2xl font-semibold text-primary">
                    {currency}
                    {booking?.price}
                  </h1>
                  <p>
                    Booking on :
                    <span className="font-semibold ml-2 text-gray-800">
                      {booking.createdAt.split("T")[0]}
                    </span>{" "}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-12 px-6 py-16 flex flex-col items-center justify-center text-center border border-borderColor rounded-lg"
          >
            <h1 className="text-gray-600 text-xl md:text-3xl font-semibold">
              No Bookings Available
            </h1>
          </motion.div>
        )}
      </>
    </motion.div>
  );
};

export default MyBooking;
