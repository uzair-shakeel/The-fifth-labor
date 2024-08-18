import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home"; // Adjust the path as needed
import Checkout from "../pages/Checkout"; // Adjust the path as needed
import Profile from "../pages/Profile"; // Adjust the path as needed
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginModal from "../components/Modals/Login";
import LoginSignupModal from "../components/Modals/Signup";
import VerificationModal from "../components/Modals/Verfication";
import MapModal from "../components/Modals/Map";
import AddressModal from "../components/Modals/Address";
import BookingsPage from "../pages/Booking";

const App = () => {
  const [isLoginSignupOpen, setIsLoginSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const openLoginSignupModal = () => setIsLoginSignupOpen(true);
  const closeLoginSignupModal = () => setIsLoginSignupOpen(false);
  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openVerificationModal = () => {
    setIsLoginSignupOpen(false);
    setIsVerificationOpen(true);
  };
  // const openMapModal = () => {
  //   setIsLoginSignupOpen(false);
  //   setIsVerificationOpen(false);
  //   setIsAddressOpen(true);
  // };

  const openAddressModal = () => {
    setIsLoginSignupOpen(false);
    setIsVerificationOpen(false);
    setIsAddressOpen(true);
  };

  const closeVerificationModal = () => setIsVerificationOpen(false);
  const closeAddressModal = () => setIsAddressOpen(false);
  const closeMapModal = () => openMapModal(false);

  return (
    <div>
      <Navbar
        openLoginSignupModal={openLoginSignupModal}
        openLoginModal={openLoginModal}
      />
      <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal} />
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
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<BookingsPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
