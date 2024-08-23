import React, { useState, useEffect } from "react";
import Step1 from "../ClientPanel/components/checkout/step1";
import Step2 from "../ClientPanel/components/checkout/step2";
import Step3 from "../ClientPanel/components/checkout/step3";
import Step4 from "../ClientPanel/components/checkout/step4";
import AddressModal from "../ClientPanel/components/AddressModal"; // Import the AddressModal component
import { MdArrowBack } from "react-icons/md";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(true); // Initialize modal visibility
  const [userData, setUserData] = useState({
    address: "",
    services: [],
    serviceDetails: "",
    time: "",
    date: "",
    total: "AED 0.00",
  });

  const titles = [
    "Service Details",
    "Popular Add-ons",
    "Date & Time",
    "Checkout",
  ];

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleDataChange = (newData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleUpdateQuantity = (serviceId, newQuantity) => {
    setUserData((prevData) => {
      let updatedServices;

      if (newQuantity <= 0) {
        updatedServices = prevData.services.filter(
          (service) => service._id !== serviceId
        );
      } else {
        updatedServices = prevData.services.map((service) =>
          service._id === serviceId
            ? { ...service, quantity: newQuantity }
            : service
        );
      }

      const updatedTotal = updatedServices.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...prevData,
        services: updatedServices,
        total: `AED ${updatedTotal}.00`,
      };
    });
  };

  const onAddService = (newService) => {
    setUserData((prevData) => {
      const existingServiceIndex = prevData.services.findIndex(
        (service) => service._id === newService._id
      );

      let updatedServices;
      if (existingServiceIndex >= 0) {
        updatedServices = prevData.services.map((service, index) =>
          index === existingServiceIndex
            ? { ...service, quantity: service.quantity + 1 }
            : service
        );
      } else {
        updatedServices = [
          ...prevData.services,
          { ...newService, quantity: 1 },
        ];
      }

      const updatedTotal = updatedServices.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return {
        ...prevData,
        services: updatedServices,
        total: `AED ${updatedTotal}.00`,
      };
    });
  };

  const onAddressSelect = (selectedAddress) => {
    setUserData((prevData) => ({
      ...prevData,
      address: selectedAddress.description,
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            onNext={handleNext}
            onDataChange={handleDataChange}
            onAddService={onAddService}
            onUpdateQuantity={handleUpdateQuantity}
            setName={setName}
          />
        );
      case 2:
        return (
          <Step2
            onNext={handleNext}
            onBack={handleBack}
            onDataChange={handleDataChange}
            onAddService={onAddService}
            userData={userData}
          />
        );
      case 3:
        return (
          <Step3
            onNext={handleNext}
            onBack={handleBack}
            onDataChange={handleDataChange}
            onAddService={onAddService}
          />
        );
      case 4:
        return (
          <Step4
            onBack={handleBack}
            onDataChange={handleDataChange}
            onAddService={onAddService}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-14 py-4 bg-gray-50">
      {showModal && (
        <AddressModal
          showModal={showModal}
          setShowModal={setShowModal}
          onAddressSelect={onAddressSelect}
          userAddresses={[
            {
              label: "Home",
              description:
                "Sadaf 3 - King Salman Bin Abdulaziz Al Saud St - Jumeirah Beach",
            },
            {
              label: "Work",
              description: "Downtown Dubai - Sheikh Mohammed bin Rashid Blvd",
            },
          ]}
        />
      )}
      <div className="flex gap-1 items-center font-semibold mb-2">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="rounded-full hover:bg-gray-100 p-2"
          >
            <MdArrowBack size={20} />
          </button>
        )}
        <p>Step {step} of 4</p>
      </div>
      <h2 className="text-3xl font-semibold mb-3 ml-3 ">{titles[step - 1]}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border-gray-500 border p-4 rounded-3xl">
          {renderStep()}
        </div>
        <div className="lg:col-span-1 text-sm bg-white border-gray-500 border p-4 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4">Booking Details</h3>

          <p className="mb-2 flex justify-between">
            <span className="text-left">Address:</span>
            <strong className="text-right">
              {userData.address || "Not provided"}
            </strong>
          </p>

          <p className="mb-2 flex justify-between">
            <span className="text-left">Service</span>
            <strong className="text-right">{name || "Not provided"}</strong>
          </p>

          {userData?.services?.map((service, index) => (
            <div key={index} className="mb-2">
              <p className="flex justify-between">
                <span className="text-left">Service Details {index + 1}:</span>
                <strong className="text-right">
                  <span className="font-[600]">{service.quantity} </span> x{" "}
                  {service.name} - {service.subCategory}
                </strong>
              </p>
            </div>
          ))}

          <p className="mb-2 flex justify-between">
            <span className="text-left">Date</span>
            <strong className="text-right">
              {userData.date || "Not selected"}
            </strong>
          </p>
          <p className="mb-2 flex justify-between">
            <span className="text-left">Time</span>
            <strong className="text-right">
              {userData.time || "Not selected"}
            </strong>
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4">Payment Summary</h3>

          <p className="flex justify-between">
            <span className="text-left font-bold">Total:</span>
            <strong className="text-right">{userData.total}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
