import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/BaseURL"; // Ensure this path is correct

const AddressModal = ({ showModal, setShowModal, onAddressSelect }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    zipcode: "",
    houseNumber: "",
    streetNumber: "",
    city: "",
  });

  // Fetch user details and addresses from API
  useEffect(() => {
    if (showModal) {
      const fetchUserDetails = async () => {
        try {
          const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.get(`${BASE_URL}/users/me`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setUserAddresses(response.data.addresses || []);
        } catch (error) {
          console.error("Error fetching user details", error);
        }
      };

      fetchUserDetails();
    }
  }, [showModal]);

  const handleSelect = () => {
    if (selectedAddress) {
      onAddressSelect(selectedAddress);
      setShowModal(false);
    }
  };

  const handleAddAddress = () => {
    setShowAddressForm(true);
  };

  const handleSaveNewAddress = () => {
    // Combine address fields into a single string if needed
    const formattedAddress = `${newAddress.zipcode} ${newAddress.houseNumber} ${newAddress.streetNumber} ${newAddress.city}`;

    // Add the new address to userAddresses state
    setUserAddresses([
      ...userAddresses,
      {
        zipcode: newAddress.zipcode,
        houseNumber: newAddress.houseNumber,
        streetNumber: newAddress.streetNumber,
        city: newAddress.city,
        formattedAddress, // Optionally include the formatted address if needed
      },
    ]);

    // Reset newAddress state
    setNewAddress({
      zipcode: "",
      houseNumber: "",
      streetNumber: "",
      city: "",
    });

    // Hide the address form
    setShowAddressForm(false);
  };


  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <button onClick={handleAddAddress} className="text-blue-500 mb-4">
            + Add New Address
          </button>
          {showAddressForm ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Add New Address</h3>
              <input
                type="text"
                placeholder="Zipcode"
                value={newAddress.zipcode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, zipcode: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="House Number"
                value={newAddress.houseNumber}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, houseNumber: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Street"
                value={newAddress.streetNumber}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, streetNumber: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                className="border p-2 mb-4 w-full"
              />
              <button
                onClick={handleSaveNewAddress}
                className="bg-yellow-400 w-full py-2 rounded-full text-white font-bold"
              >
                Save Address
              </button>
            </div>
          ) : (
            <ul>
              {userAddresses.length === 0 ? (
                <li className="text-gray-500">
                  No addresses available. Please add one.
                </li>
              ) : (
                userAddresses.map((address, index) => (
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
                          <p>
                            <strong>Zipcode:</strong> {address.zipcode}
                          </p>
                          <p>
                            <strong>House Number:</strong> {address.houseNumber}
                          </p>
                          <p>
                            <strong>Street Number:</strong>{" "}
                            {address.streetNumber}
                          </p>
                          <p>
                            <strong>City:</strong> {address.city}
                          </p>
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
                ))
              )}
            </ul>
          )}
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
