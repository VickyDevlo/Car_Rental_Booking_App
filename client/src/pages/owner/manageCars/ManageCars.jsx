import { useEffect, useState } from "react";
import { Title } from "../../../components/owner/Title";
import { assets } from "../../../assets/assets";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const ManageCars = () => {
  const { currency, isOwner, axios } = useAppContext();

  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data?.success) {
        setCars(data?.cars);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data?.success) {
        toast.success(data?.message);
        fetchOwnerCars();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you wont to delete the car?"
      );

      if (!confirm) {
        return null;
      }

      const { data } = await axios.post("/api/owner/delete-car", { carId });
      if (data?.success) {
        toast.success(data?.message);
        fetchOwnerCars();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className="px-4 pt-3 md:pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
      />
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium max-md:hidden">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {cars &&
              cars.map((car, i) => (
                <tr key={i} className="border-t border-borderColor">
                  <td className="flex items-center gap-2 p-3">
                    <img
                      src={car?.image}
                      alt="car_image  "
                      className="md:w-12 md:h-12 aspect-square rounded-md object-cover"
                    />
                    <div className="max-md:hidden">
                      <p className="font-medium">
                        {car?.brand} {car?.model}
                      </p>
                      <p className="font-medium text-xs text-gray-500">
                        {car?.seatingCapacity} • {car?.transmission}
                      </p>
                    </div>
                  </td>
                  <td className="p-3 font-medium max-md:hidden">
                    {car?.category}
                  </td>
                  <td className="p-3 font-medium">
                    {currency}
                    {car?.pricePerDay}/day
                  </td>
                  <td className="p-3 font-medium">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        car?.isAvailable
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {car?.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="max-md:hidden flex justify-start items-center gap-2">
                    <img
                      onClick={() => toggleAvailability(car._id)}
                      src={
                        car.isAvailable
                          ? assets.eye_close_icon
                          : assets.eye_icon
                      }
                      alt="edit_btn"
                      className="cursor-pointer bg-primary/15 hover:bg-primary/10 rounded-full transition-all"
                    />
                    <img
                      src={assets.delete_icon}
                      onClick={() => deleteCar(car._id)}
                      alt="delete_btn"
                      className="cursor-pointer bg-red-200 hover:bg-red-100 rounded-full transition-all"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
