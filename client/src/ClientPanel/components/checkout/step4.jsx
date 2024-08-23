import React, { useState } from "react";
import PaymentMethodModal from "../PaymentMethodModal"; // Import the modal component

const Step4 = ({ onNext, onSubmit }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("card");

  const handleComplete = () => {
    // Handle the complete button click (e.g., validation, submission, etc.)
    onSubmit();
  };

  const handleInputChange = (e, setter, maxLength, pattern) => {
    const { value } = e.target;
    if (value.length <= maxLength && (!pattern || pattern.test(value))) {
      setter(value);
    }
  };

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Payment Method Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Payment Method</h3>
          <button
            className="text-blue-600 font-semibold"
            onClick={() => setIsModalOpen(true)}
          >
            Change
          </button>
        </div>
        <div className="flex items-center gap-3 mt-2 p-3 border-2 rounded-lg bg-blue-100">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
            {/* Credit Card Icon */}
            <i className="fas fa-credit-card"></i>
          </div>
          <div className="text-lg font-semibold">
            {selectedMethod === "card"
              ? "Credit / Debit Card"
              : "Cash (+5 AED)"}
          </div>
        </div>
      </div>

      {/* Conditional Rendering for Card Details */}
      {selectedMethod === "card" && (
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) =>
                handleInputChange(e, setCardNumber, 16, /^[0-9]*$/)
              }
              placeholder="Card Number"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              value={expiryDate}
              onChange={(e) =>
                handleInputChange(
                  e,
                  setExpiryDate,
                  5,
                  /^(0[1-9]|1[0-2])\/\d{0,2}$/
                )
              }
              placeholder="Exp. Date (MM/YY)"
              className="w-1/2 px-4 py-2 border rounded"
            />
            <input
              type="text"
              value={cvv}
              onChange={(e) => handleInputChange(e, setCvv, 3, /^[0-9]{0,3}$/)}
              placeholder="CVV Number"
              className="w-1/2 px-4 py-2 border rounded"
            />
          </div>
        </div>
      )}

      {/* Information Boxes */}
      <div className="mt-4 space-y-2">
        <div className="p-3 border rounded bg-gray-100 text-sm text-gray-700">
          <i className="fas fa-sync-alt mr-2"></i>
          AED 3.67 will be charged to verify your card. The amount will be
          refunded immediately.
        </div>
        <div className="p-3 border rounded bg-gray-100 text-sm text-gray-700">
          <i className="fas fa-info-circle mr-2"></i>
          The session amount will be reserved on your card. You will only be
          charged once the session is completed.
        </div>
      </div>

      {/* Complete Button */}
      <div className="mt-6">
        <button
          onClick={handleComplete}
          className="w-full bg-yellow-400 text-white py-2 px-4 rounded-full font-bold"
        >
          Complete
        </button>
      </div>

      {/* Payment Method Modal */}
      <PaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectMethod}
      />
    </div>
  );
};

export default Step4;
