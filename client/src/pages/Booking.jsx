import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/BaseURL";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const fetchBookings = async () => {
      const token = JSON.parse(localStorage.getItem("token"));

      try {
        const response = await axios.get(`${BASE_URL}/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);
      } catch (error) {
        toast.error("Failed to fetch bookings.");
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    activeTab === "upcoming"
      ? new Date(booking.date) >= new Date()
      : new Date(booking.date) < new Date()
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">Bookings</h1>
      <div className="flex justify-center border-b mb-4">
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "upcoming"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "past"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        {filteredBookings.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">
              You don't have any {activeTab} appointments
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold">{booking.title}</h2>
                <p className="text-gray-600">{booking.date}</p>
                <p className="text-gray-600">{booking.time}</p>
                <p className="text-gray-600">{booking.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
