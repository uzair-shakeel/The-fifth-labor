import React, { useState } from "react";

const Step2Checkout = () => {
  const handleSubmit = () => {
    // Handle the submission
    alert("Submitted");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center p-6">
      {/* Left Side - Add-ons */}
      <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Popular Add-ons</h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">People also added</h3>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 text-white rounded-lg py-3 font-semibold hover:bg-yellow-500 transition duration-200"
        >
          Next
        </button>
      </div>

      {/* Right Side - Booking Details */}
      <div className="w-full md:w-1/3 p-4 mt-6 md:mt-0 md:ml-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
        <div className="text-sm text-gray-600">
          <p>
            <strong>Address:</strong> Sadaf 3 - King Salman Bin Abdulaziz Al
            Saud St - Jumeirah Beach Residence - Dubai - United Arab Emirates
          </p>
          <p>
            <strong>Service:</strong> Home Cleaning
          </p>
          <p>
            <strong>Duration:</strong> 2 hours
          </p>
          <p>
            <strong>Date & Start Time:</strong> 11 Aug 2024, 08:00-08:30
          </p>
          <p>
            <strong>Number of Professionals:</strong> 1
          </p>
          <p>
            <strong>Material:</strong> No
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step2Checkout;
