import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/BaseURL";
import ScaleLoader from "react-spinners/ScaleLoader";

const UserDetailsForm = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    gender: "",
    name: "",
    dateOfBirth: "",
    email: "",
    addresses: {
      zipcode: "",
      houseNumber: "",
      streetNumber: "",
      city: "",
    },
  });

  const fetchUserData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    try {
      const response = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input name belongs to the addresses object
    if (["zipcode", "houseNumber", "streetNumber", "city"].includes(name)) {
      setUserData({
        ...userData,
        addresses: {
          ...userData.addresses,
          [name]: value,
        },
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    setLoading(true);
    console.log(userData);
    try {
      const response = await axios.put(`${BASE_URL}/users/profile`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Details updated successfully!");
        fetchUserData(); // Optionally refetch user data to reflect changes immediately
      }
    } catch (error) {
      toast.error("Failed to update user details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-12">
      <h1 className="text-3xl font-bold text-center my-2">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-md rounded-lg  p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* <div className="mb-4">
            <label className="block text-gray-700">Zipcode</label>
            <input
              type="text"
              name="zipcode"
              value={userData.addresses?.zipcode}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div> */}

          {/* <div className="mb-4">
            <label className="block text-gray-700">House Number</label>
            <input
              type="text"
              name="houseNumber"
              value={userData.addresses?.houseNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Street Number</label>
            <input
              type="text"
              name="streetNumber"
              value={userData.addresses?.streetNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={userData.addresses?.city}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div> */}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-white p-2 rounded-md hover:bg-yellow-500"
          >
            {!loading ? (
              "Save"
            ) : (
              <ScaleLoader color={"#fff"} className="h-2 w-auto" height={12} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsForm;
