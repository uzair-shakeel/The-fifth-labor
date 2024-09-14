import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ClientHome from "../ClientPanel/Home";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginModal from "../components/Modals/Login";
import LoginSignupModal from "../components/Modals/Signup";
import VerificationModal from "../components/Modals/Verfication";
import MapModal from "../components/Modals/Map";
import AddressModal from "../components/Modals/Address";
import BookingsPage from "../pages/Booking";
import Confirmed from "../pages/Confirmed";
import PrivateRoute from "../utils/privateRoutes"; // Import the PrivateRoute component
import Addresses from "../pages/Addresses";
import ComingSoon from "../pages/ComingSoon";
import BlogDetail from "../components/BlogDetails";

const App = () => {
  const [isLoginSignupOpen, setIsLoginSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  // Check localStorage for the token to update isLoggedIn state
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if token exists, false otherwise
  }, []);

  // Function to handle login
  const handleLogin = (token) => {
    localStorage.setItem("token", token); // Store the token in localStorage
    setIsLoggedIn(true); // Update the isLoggedIn state to true
    closeLoginModal(); // Close the login modal
  };

  const openLoginSignupModal = () => setIsLoginSignupOpen(true);
  const closeLoginSignupModal = () => setIsLoginSignupOpen(false);
  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openVerificationModal = () => {
    setIsLoginSignupOpen(false);
    setIsVerificationOpen(true);
  };

  const openAddressModal = () => {
    setIsLoginSignupOpen(false);
    setIsVerificationOpen(false);
    setIsAddressOpen(true);
  };

  const closeVerificationModal = () => setIsVerificationOpen(false);
  const closeAddressModal = () => setIsAddressOpen(false);
  const closeMapModal = () => setIsMapOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    setIsLoggedIn(false); // Update the state to reflect logout
  };

  return (
    <div>
      <Navbar
        openLoginSignupModal={openLoginSignupModal}
        openLoginModal={openLoginModal}
        handleLogout={handleLogout}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeLoginModal}
        onLogin={handleLogin}
      />
      <LoginSignupModal
        isOpen={isLoginSignupOpen}
        onClose={closeLoginSignupModal}
        openVerificationModal={openVerificationModal}
      />
      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={closeVerificationModal}
        openAddressModal={openAddressModal}
      />
      <MapModal
        isOpen={isMapOpen}
        onClose={closeMapModal}
        openAddressModal={openAddressModal}
      />
      <AddressModal
        isOpen={isAddressOpen}
        onClose={closeAddressModal}
        openAddressModal={openAddressModal}
      />
      <Routes>
        <Route path="/" element={<ClientHome />} />
        {/* <Route path="/checkout/:id" element={<Checkout step={1} />} /> */}
        <Route path="/checkout/:id/step-1" element={<Checkout step={1} />} />
        <Route path="/checkout/:id/step-2" element={<Checkout step={2} />} />
        <Route path="/checkout/:id/step-3" element={<Checkout step={3} />} />
        <Route path="/checkout/:id/step-4" element={<Checkout step={4} />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/addresses"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Addresses />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <BookingsPage />
            </PrivateRoute>
          }
        />
        <Route path="/appointment" element={<Confirmed />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
