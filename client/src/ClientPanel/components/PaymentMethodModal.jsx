import React, { useState } from "react";

const PaymentMethodModal = ({ isOpen, onClose, onSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleSelect = () => {
    if (selectedMethod) {
      onSelect(selectedMethod);
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Change Payment Method</h3>
          <button className="text-gray-600" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="mt-4">
          <button
            className="text-blue-600 font-semibold mb-4"
            onClick={() => setSelectedMethod("card")}
          >
            + Add New Card
          </button>
          <div className="space-y-4">
            <div
              className={`flex items-center p-3 border rounded-lg ${
                selectedMethod === "cash" ? "border-blue-600" : ""
              }`}
              onClick={() => setSelectedMethod("cash")}
            >
              <i className="fas fa-money-bill-wave text-xl mr-2"></i>
              <span className="text-lg">Cash (+5 AED)</span>
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "cash"}
                className="ml-auto"
                readOnly
              />
            </div>
            <div
              className={`flex items-center p-3 border rounded-lg ${
                selectedMethod === "card" ? "border-blue-600" : ""
              }`}
              onClick={() => setSelectedMethod("card")}
            >
              <i className="fas fa-credit-card text-xl mr-2"></i>
              <span className="text-lg">Credit / Debit Card</span>
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === "card"}
                className="ml-auto"
                readOnly
              />
            </div>
          </div>
          <button
            onClick={handleSelect}
            className="w-full mt-6 bg-yellow-400 text-white py-2 px-4 rounded-full font-bold"
          >
            Select payment method
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
