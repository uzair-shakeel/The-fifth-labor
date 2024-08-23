import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/BaseURL";
import Modal from "react-modal"; // Ensure you have installed react-modal
import { RxCross2 } from "react-icons/rx";

// Optional: Set app element for accessibility
Modal.setAppElement("#root");

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    zipcode: "",
    streetNumber: "",
    houseNumber: "",
    city: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(response.data.addresses || []);
    } catch (error) {
      toast.error("Failed to fetch addresses");
    }
  };

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    setLoading(true);
    try {
      let updatedAddresses = [...addresses];
      if (editingIndex !== null) {
        updatedAddresses[editingIndex] = newAddress;
      } else {
        updatedAddresses.push(newAddress);
      }
      const response = await axios.put(
        `${BASE_URL}/users/profile`,
        { addresses: updatedAddresses },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setAddresses(updatedAddresses);
        toast.success("Address saved successfully!");
        setNewAddress({
          zipcode: "",
          streetNumber: "",
          houseNumber: "",
          city: "",
        });
        setEditingIndex(null);
        closeModal();
      }
    } catch (error) {
      toast.error("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  const handleEditAddress = (index) => {
    setEditingIndex(index);
    setNewAddress(addresses[index]);
    openModal();
  };

  const handleDeleteAddress = async (index) => {
    const token = JSON.parse(localStorage.getItem("token"));
    setLoading(true);
    try {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      const response = await axios.put(
        `${BASE_URL}/users/profile`,
        { addresses: updatedAddresses },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setAddresses(updatedAddresses);
        toast.success("Address deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete address");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setEditingIndex(null);
    setNewAddress({
      zipcode: "",
      streetNumber: "",
      houseNumber: "",
      city: "",
    });
  };

  return (
    <div className="my-12 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-2">Addresses</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          {addresses.map((address, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p>{`${address.city}, ${address.streetNumber} ${address.houseNumber}`}</p>
                  <p>{address.zipcode}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEditAddress(index)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(index)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={openModal}
          className="bg-yellow-400 text-white p-2 rounded-md w-full"
        >
          Add New Address
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Address Modal"
        className="bg-white relative p-8 max-w-lg mx-auto mt-16 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <button
          onClick={closeModal}
          className="mt-4 absolute top-0 right-4 text-gray-500"
        >
          <RxCross2 size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {editingIndex !== null ? "Edit Address" : "Add New Address"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            value={newAddress.zipcode}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="streetNumber"
            placeholder="Street Number"
            value={newAddress.streetNumber}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="houseNumber"
            placeholder="House Number"
            value={newAddress.houseNumber}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={newAddress.city}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleSaveAddress}
            disabled={loading}
            className="bg-yellow-400 text-white p-2 rounded-md w-full"
          >
            {loading
              ? "Saving..."
              : editingIndex !== null
              ? "Update Address"
              : "Add Address"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Addresses;
