import React, { useState } from "react";

const AddressModal = ({
  showModal,
  setShowModal,
  onAddressSelect,
  userAddresses,
}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelect = () => {
    onAddressSelect(selectedAddress);
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <button className="text-blue-500 mb-4">+ Add New Address</button>
          <ul>
            {userAddresses.map((address, index) => (
              <li key={index} className="mb-3">
                <div
                  className={`p-3 border rounded-lg ${
                    selectedAddress === address
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold">{address.label}</p>
                      <p>{address.description}</p>
                    </div>
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === address}
                      onChange={() => setSelectedAddress(address)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSelect}
            className="bg-yellow-400 w-full mt-4 py-2 rounded-full text-white font-bold"
          >
            Select
          </button>
        </div>
      </div>
    )
  );
};

export default AddressModal;
