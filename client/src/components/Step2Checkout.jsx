import React, { useState } from "react";

const Step2Checkout = () => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const addOns = [
    {
      id: 1,
      title: "Party Cleaning",
      description: "Ease the after-party cleanup with our...",
      price: 25,
      originalPrice: 30,
      imgSrc: "/path-to-image/party-cleaning.jpg",
    },
    {
      id: 2,
      title: "Balcony Cleaning",
      description: "Get your balcony freshly cleaned.",
      price: 19,
      originalPrice: 25,
      imgSrc: "/path-to-image/balcony-cleaning.jpg",
    },
    {
      id: 3,
      title: "Cupboard Cleaning",
      description: "Messy cupboards? We will clean and...",
      price: 25,
      originalPrice: 30,
      imgSrc: "/path-to-image/cupboard-cleaning.jpg",
    },
    // Add more add-ons here as needed
  ];

  const toggleAddOn = (id) => {
    setSelectedAddOns((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((addOnId) => addOnId !== id)
        : [...prevSelected, id]
    );
  };

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
          <div className="flex flex-wrap gap-4">
            {addOns.map((addOn) => (
              <div
                key={addOn.id}
                className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg shadow-md"
              >
                <img
                  src={addOn.imgSrc}
                  alt={addOn.title}
                  className="rounded-lg mb-3"
                />
                <h4 className="text-md font-semibold">{addOn.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {addOn.description}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="text-blue-500">AED {addOn.price}</span>
                  <span className="line-through text-gray-400 ml-2">
                    AED {addOn.originalPrice}
                  </span>
                </p>
                <button
                  onClick={() => toggleAddOn(addOn.id)}
                  className={`w-full py-2 rounded-lg ${
                    selectedAddOns.includes(addOn.id)
                      ? "bg-blue-100 text-blue-600"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {selectedAddOns.includes(addOn.id) ? "Added" : "Add +"}
                </button>
              </div>
            ))}
          </div>
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
