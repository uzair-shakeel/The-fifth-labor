import React, { useState, useEffect } from "react";
import axios from "axios";
import Step1 from "../ClientPanel/components/checkout/step1";
import Step2 from "../ClientPanel/components/checkout/step2";
import Step3 from "../ClientPanel/components/checkout/step3";
import Step4 from "../ClientPanel/components/checkout/step4";
import AddressModal from "../ClientPanel/components/AddressModal"; // Import the AddressModal component
import { MdArrowBack } from "react-icons/md";
import { BASE_URL } from "../utils/BaseURL";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "sk_test_51PGNqOP8GLeLec0dZwYS3mn0w1CUODT2kG1W6NZfuUYau2VVKDPEF6QnGoQLEPsDizkMewRO5bRkGljVJ5Vox3ue00Cl0RuWw4"
// );

const Checkout = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sessionId = queryParams.get("session_id");

    if (sessionId) {
      // Fetch the session details from your backend
      axios.get(`/api/payment/session/${sessionId}`).then((response) => {
        setPaymentStatus(response.data.status);
      });
      console
        .log("stripeee", response)
        .catch((error) => {
          console.error("Error fetching payment status:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

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
        (total, item) => total + item.discountedPrice * item.quantity,
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

  const submitBooking = async () => {
    // e.preventDefault();
    if (!userData.address) {
      toast.error("Please select an address first.");
      setShowModal(true); // Show the address modal
      return;
    }

    const requestBody = {
      services: userData.services.map((item) => ({
        id: item._id,
        price: item.discountedPrice,
        name: item.name,
        quantity: item.quantity,
      })),
    };
    try {
      // Send request to initiate checkout
      const res = await fetch(`${BASE_URL}/payment/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(requestBody),
      });
      // Check if the response is okay
      if (!res.ok) {
        throw new Error(`Failed to initiate checkout: ${res.statusText}`);
      }

      // Parse response data
      const data = await res.json();

      // Check if the response contains the URL for redirection
      if (!data.url) {
        throw new Error("No redirection URL found in the response");
      }

      console.log(data);
      window.location = data.url;
    } catch (error) {
      console.error("Error during checkout:", error.message);
      // Display user-friendly error message
      toast.error("An error occurred during checkout. Please try again later.");
    }

    // try {
    //   const token = JSON.parse(localStorage.getItem("token")); // Retrieve token from localStorage
    //   console.log("hihi", userData);
    //   const response = await axios.post(`${BASE_URL}/bookings`, userData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`, // Include the token in the request header
    //     },
    //   });
    //   // Handle success, e.g., show a success message, redirect user, etc.
    //   toast.success("Booking successful");
    //   navigate("/appointment", { state: { bookingData: response.data } });
    // } catch (error) {
    //   console.error("Error submitting booking:", error);
    //   toast.error("Error submitting booking");
    //   // Handle error, e.g., show an error message
    // }
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
            onSubmit={submitBooking} // Add submit function to Step4
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-14 py-4 bg-gray-50 max-w-7xl mx-auto">
      {showModal && (
        <AddressModal
          showModal={showModal}
          setShowModal={setShowModal}
          onAddressSelect={onAddressSelect}
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
