import React from "react";

const Step4Checkout = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Step Indicator */}
      <div className="flex items-center mb-6">
        <button className="mr-2 text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <span className="text-xl font-semibold">Step 4 of 4</span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side - Payment Method */}
        <div className="col-span-2">
          {/* Payment Method Section */}
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Payment Method</h2>
              <button className="text-blue-500 font-semibold">Change</button>
            </div>
            <div className="mt-2 flex items-center space-x-4">
              <button className="flex items-center bg-blue-500 text-white rounded-lg px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 6.75h-1.5a2.25 2.25 0 00-2.25 2.25v6a2.25 2.25 0 002.25 2.25h1.5M8.25 15l5.25 5.25m0 0l5.25-5.25M13.5 20.25V15m0 0l-5.25-5.25m5.25 5.25L8.25 9.75"
                  />
                </svg>
                Credit / Debit Card
              </button>
              <img
                src="/path/to/card-icons.jpg"
                alt="Card Icons"
                className="h-6"
              />
            </div>
          </div>

          {/* Card Details Input */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 border rounded-lg"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Exp. Date (MM/YY)"
                className="w-1/2 p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="CVV Number"
                className="w-1/2 p-3 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Booking Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
          <div>
            <p className="text-sm text-gray-600">
              <strong>Address: </strong>
              Sadaf 3 - King Salman Bin Abdulaziz Al Saud St - Jumeirah Beach
              Residence - Dubai - United Arab Emirates
            </p>
            <p className="text-sm text-gray-600">
              <strong>Frequency: </strong>
              One Time
            </p>
            <p className="text-sm text-gray-600">
              <strong>Service: </strong>
              Home Cleaning
            </p>
            <p className="text-sm text-gray-600">
              <strong>Duration: </strong>2 hours
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date & Start Time: </strong>
              11 Aug 2024, 08:00-08:30
            </p>
            <p className="text-sm text-gray-600">
              <strong>Number of Professionals: </strong>1
            </p>
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-yellow-500 text-white font-semibold rounded-lg px-6 py-3">
          Complete
        </button>
      </div>
    </div>
  );
};

export default Step4Checkout;
