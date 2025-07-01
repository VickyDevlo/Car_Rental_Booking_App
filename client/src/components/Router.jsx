import { Route, Routes } from "react-router-dom";
import { CarDetails, Cars, Home, MyBooking } from "../pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/car-details/:id" element={<CarDetails />} />
      <Route path="/my-bookings" element={<MyBooking />} />
    </Routes>
  );
};
