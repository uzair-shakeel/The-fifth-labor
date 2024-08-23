import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/BaseURL";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBookings = async () => {
      const token = JSON.parse(localStorage.getItem("token"));

      try {
        const response = await axios.get(
          `${BASE_URL}/bookings/user/${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data || []);
      } catch (error) {
        toast.error("Failed to fetch bookings");
        console.error("Error fetching bookings", error);
      }
    };

    fetchBookings();
  }, [user._id]);

  const filteredBookings = bookings.filter((booking) => {
    const isUpcoming = new Date(booking.date) >= new Date();
    const isPast = new Date(booking.date) < new Date();
    const isCompleted = booking.status === "completed";

    if (activeTab === "upcoming") {
      return isUpcoming && booking.status !== "completed"; // Only upcoming and not completed
    } else if (activeTab === "past") {
      return booking.status === "completed";
    }
    return false;
  });

  return (
    <div className="max-w-2xl mx-auto p-12">
      <h1 className="text-3xl font-bold text-center my-4">Bookings</h1>
      <div className="flex justify-center border-b mb-4">
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "upcoming"
              ? "border-b-2 border-[#00C3FF] text-[#00C3FF]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "past"
              ? "border-b-2 border-[#00C3FF] text-[#00C3FF]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        {filteredBookings?.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">
              You don't have any {activeTab} appointments
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gray-50 p-6 rounded-lg shadow-md text-sm flex flex-col"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {booking.services[0]?.name || "Service"}
                  </h2>
                  <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}{" "}
                    {/* Dynamic status display */}
                  </span>
                </div>
                <p className="text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <strong>Time:</strong> {booking.time}
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> {booking.address}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Total:</strong> {booking.total}
                </p>
                <div className="flex items-center">
                  <span className="inline-block bg-blue-100 text-[#00C3FF] text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                    {booking.type || "One-off"}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Verified Professional
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
