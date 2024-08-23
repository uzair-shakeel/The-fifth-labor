import React from "react";
import { FaCheckCircle, FaCalendarAlt, FaClock } from "react-icons/fa";

const Confirmed = () => {
  return (
    <div className="max-w-md mx-auto p-4 font-sans text-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold">🎉 Order Placed</h2>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-green-600 flex items-center">
            Confirmed <FaCheckCircle className="ml-2 text-xl" />
          </h3>
        </div>
        <p className="flex items-center text-sm text-gray-600 mb-2">
          <FaCalendarAlt className="mr-2" /> Saturday &nbsp;
          <FaClock className="ml-4 mr-2" /> 09:00-11:00
        </p>
        <p className="text-sm text-gray-700 mb-4">
          Thank you. We'll match you with a top-rated professional. ⭐
        </p>
        <button className="w-full bg-yellow-200 text-yellow-800 py-2 rounded-lg font-medium">
          Share a beverage with them
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
        <div className="text-sm space-y-2">
          <p>
            <span className="font-semibold">Status:</span> Confirmed
          </p>
          <p>
            <span className="font-semibold">Reference Code:</span> F22DC9
          </p>
          <p>
            <span className="font-semibold">Service:</span> Laundry and Dry
            Cleaning
          </p>
          <p>
            <span className="font-semibold">Date & Time:</span> 24 Aug 2024,
            09:00-11:00
          </p>
          <p>
            <span className="font-semibold">Service Details:</span> Wash & Fold
            - Home Linens (Upto 15 items): 1, Wash & Iron - Small (Upto 10
            items): 1, Iron - Medium (11 to 20 items): 1, Jacket - Dry cleaning:
            1, Trouser - Dry cleaning: 1, Shirt - Dry cleaning: 1
          </p>
        </div>
        <button className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium">
          Manage This Booking
        </button>
      </div>
    </div>
  );
};

export default Confirmed;
