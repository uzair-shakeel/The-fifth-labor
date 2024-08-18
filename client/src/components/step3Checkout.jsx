import React from "react";

const Step3Checkout = () => {
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
        <span className="text-xl font-semibold">Step 3 of 4</span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side - Frequency and Professional Selection */}
        <div className="col-span-2">
          {/* Frequency Section */}
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Frequency</h2>
              <button className="text-blue-500 font-semibold">Change</button>
            </div>
            <div className="mt-2">
              <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
                One Time Service
              </button>
            </div>
          </div>

          {/* Professional Selection */}
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Which professional do you prefer?
            </h2>
            <div className="flex items-center space-x-4">
              <div className="p-4 border rounded-lg">
                <img
                  src="/path/to/justlife-logo.jpg"
                  alt="JustLife Auto Assign"
                  className="w-16 h-16"
                />
                <p className="mt-2 text-center">Auto assign</p>
              </div>
              <div className="p-4 border rounded-lg">
                <img
                  src="/path/to/professional1.jpg"
                  alt="Professional 1"
                  className="w-16 h-16 rounded-full"
                />
                <p className="mt-2 text-center">Mildred</p>
              </div>
              <div className="p-4 border rounded-lg">
                <img
                  src="/path/to/professional2.jpg"
                  alt="Professional 2"
                  className="w-16 h-16 rounded-full"
                />
                <p className="mt-2 text-center">Dhana</p>
              </div>
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

      {/* Next Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-yellow-500 text-white font-semibold rounded-lg px-6 py-3">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3Checkout;
