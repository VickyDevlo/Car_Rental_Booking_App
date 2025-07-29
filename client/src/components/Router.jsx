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
import { ProtectedOwnerRoute } from "./ProtectedOwnerRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/car-details/:id" element={<CarDetails />} />
      <Route path="/my-bookings" element={<MyBooking />} />

      <Route path="/owner" element={<ProtectedOwnerRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBooking />} />
        </Route>
      </Route>
    </Routes>
  );
};
