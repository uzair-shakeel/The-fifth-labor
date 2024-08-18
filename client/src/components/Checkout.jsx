import React, { useState } from "react";

const CheckoutPage = () => {
  const [hours, setHours] = useState(2);
  const [professionals, setProfessionals] = useState(1);
  const [materials, setMaterials] = useState(false);

  const handleHourSelection = (selectedHours) => {
    setHours(selectedHours);
  };

  const handleProfessionalSelection = (selectedProfessionals) => {
    setProfessionals(selectedProfessionals);
  };

  const toggleMaterials = () => {
    setMaterials(!materials);
  };

  const handleSubmit = () => {
    // Handle the submission
    alert("Submitted");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center p-6">
      {/* Left Side - Form */}
      <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Service Details</h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">
            How many hours do you need your professional to stay?
          </h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
              <button
                key={number}
                onClick={() => handleHourSelection(number)}
                className={`w-12 h-12 flex items-center justify-center rounded-full border ${
                  hours === number
                    ? "bg-blue-100 text-blue-600 border-blue-300"
                    : "border-gray-300"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">
            How many professionals do you need?
          </h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((number) => (
              <button
                key={number}
                onClick={() => handleProfessionalSelection(number)}
                className={`w-12 h-12 flex items-center justify-center rounded-full border ${
                  professionals === number
                    ? "bg-blue-100 text-blue-600 border-blue-300"
                    : "border-gray-300"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Need cleaning materials?</h3>
          <button
            onClick={toggleMaterials}
            className={`px-4 py-2 rounded-full ${
              materials
                ? "bg-blue-100 text-blue-600 border-blue-300"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {materials ? "Yes" : "No"}
          </button>
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
            <strong>Duration:</strong> {hours} hours
          </p>
          <p>
            <strong>Number of Professionals:</strong> {professionals}
          </p>
          <p>
            <strong>Material:</strong> {materials ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
