import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, children }) => {
  // If the user is logged in, render the children components
  // Otherwise, redirect to the login page
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
