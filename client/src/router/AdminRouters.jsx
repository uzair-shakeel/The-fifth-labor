import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import MyAccount from "../pages/MyAccount.jsx";
import Dashboard from "../AdminPanel/Dashboard.jsx";
import Services from "../AdminPanel/Services.jsx";
import Bookings from "../AdminPanel/Bookings.jsx";
import Users from "../AdminPanel/Users.jsx";
import Messages from "../AdminPanel/Messages.jsx";
import Admins from "../AdminPanel/Admins.jsx";
import CreateService from "../AdminPanel/component/CreateService.jsx";
import CreateCleaner from "../AdminPanel/component/CreateCleaner.jsx";
import UpdateService from "../AdminPanel/component/UpdateService.jsx";
import Categories from "../AdminPanel/Categories.jsx";
import CreateCategory from "../AdminPanel/component/CreateCategory.jsx";
import UpdateCategory from "../AdminPanel/component/UpdateCleaner.jsx";
import BookingDetails from "../AdminPanel/component/bookingDetails.jsx";
import Cleaners from "../AdminPanel/Cleaners.jsx";
import UpdateCleaner from "../AdminPanel/component/UpdateCleaner.jsx";

const AdminRouters = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/categories" element={<Categories />} />
      <Route path="/cleaners" element={<Cleaners />} />
      <Route path="/services" element={<Services />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/users" element={<Users />} />
      <Route path="/messages" element={<Messages />} />
      {/* <Route path="/feedbacks" element={<Feedbacks />} /> */}
      <Route path="/admins" element={<Admins />} />
      <Route path="/createcategory" element={<CreateCategory />} />
      <Route path="/createcleaner" element={<CreateCleaner />} />
      <Route path="/createservice" element={<CreateService />} />
      <Route path="/booking/:id" element={<BookingDetails />} />
      <Route path="/updatecategory/:id" element={<UpdateCategory />} />
      <Route path="/updatecleaner/:id" element={<UpdateCleaner />} />
      <Route path="/updateservice/:id" element={<UpdateService />} />

      {/* User Logged In? */}
      {user ? (
        <Route path="/my-account/:id" element={<MyAccount />} />
      ) : (
        <Route path="/my-account/:id" element={<Navigate to="/" />} />
      )}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AdminRouters;
