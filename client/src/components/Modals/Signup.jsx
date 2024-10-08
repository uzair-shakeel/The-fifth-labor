import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../../utils/BaseURL";
import ScaleLoader from "react-spinners/ScaleLoader";
import { RxCross2 } from "react-icons/rx";

const LoginSignupModal = ({ isOpen, onClose, openVerificationModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleContinue = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        const { name, email, role, _id } = response.data;

        // Store only name and email in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ name, email, role, _id })
        );
        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        toast.success("Registration successful!");
        openVerificationModal(); // Open verification modal or continue with the process
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md">
          <div className="flex justify-between items-center border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold">Sign Up</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900"
            >
              <RxCross2 size={25} />
            </button>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="John Doe"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="yourname@example.com"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            <button
              className={`w-full bg-yellow-400 text-white rounded-lg py-2 font-semibold${
                loading ? "hover:bg-yellow-500" : ""
              }  transition duration-200`}
              disabled={loading}
              onClick={handleContinue}
            >
              {!loading ? (
                "Continue"
              ) : (
                <ScaleLoader
                  color={"#fff"}
                  className="h-2 w-auto"
                  height={12}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignupModal;
