import React from "react";
import { FaCheckCircle, FaCalendarAlt, FaClock } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import popper from "../../public/party_popper.gif";

const Confirmed = () => {
  const location = useLocation();
  const { bookingData } = location.state || {}; // Access the passed data

  // Parse bookingData if it's a string (e.g., from session storage)
  // const bookingData = JSON.parse(location.state?.bookingData || '{}');

  // Format the date and time for display
  const bookingDate = new Date(bookingData?.date).toLocaleDateString();
  const bookingTime = bookingData?.time || "Not specified";

  return (
    <div className="max-w-md mx-auto p-4 font-sans text-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold">🎉 Order Placed</h2>
      </div>

      <div className="bg-gray-50 p-4  rounded-lg border mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-green-600 flex items-center">
            Confirmed <FaCheckCircle className="ml-2 text-xl" />
          </h3>
        </div>
        <p className="flex items-center text-sm text-gray-600 mb-2">
          <FaCalendarAlt className="mr-2" /> {bookingDate} &nbsp;
          <FaClock className="ml-4 mr-2" /> {bookingTime}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          Thank you. We'll match you with a top-rated professional. ⭐
        </p>
        <span className="w-full bg-yellow-200 flex text-center justify-center text-yellow-800 p-2 mx-auto rounded-lg font-medium">
          Share a beverage with them
        </span>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
        <div className="text-sm space-y-2">
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {bookingData?.status || "Not specified"}
          </p>
          <p>
            <span className="font-semibold">Reference Code:</span>{" "}
            {bookingData?._id || "Not available"}
          </p>
          <p>
            <span className="font-semibold">Service:</span>{" "}
            {bookingData?.services[0]?.name || "Not specified"}
          </p>
          <p>
            <span className="font-semibold">Date & Time:</span> {bookingDate},{" "}
            {bookingTime}
          </p>
          <p>
            <span className="font-semibold">Service Details:</span>{" "}
            {bookingData?.services[0]?.description || "No details available"}
          </p>
          <p>
            <span className="font-semibold">Total:</span>{" "}
            {bookingData?.total || "Not specified"}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {bookingData?.address || "Not specified"}
          </p>
        </div>
        <Link to="/">
          <button className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium">
            Go to the Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Confirmed;
