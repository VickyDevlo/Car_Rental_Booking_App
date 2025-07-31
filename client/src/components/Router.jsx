import { Route, Routes } from "react-router-dom";
import {
  AddCar,
  CarDetails,
  Cars,
  Dashboard,
  Home,
  ManageBooking,
  ManageCars,
  MyBooking,
} from "../pages";
import { Layout } from "../pages/owner/Layout";
import ChangePassword from "../pages/changePassword/ChangePassword";
import { ProtectedRoute } from "./ProtectedRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/car-details/:id" element={<CarDetails />} />
      <Route path="/my-bookings" element={<MyBooking />} />

      <Route path="/owner" element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBooking />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};
