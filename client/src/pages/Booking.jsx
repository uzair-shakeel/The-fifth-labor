import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/BaseURL";
import { RxCross1 } from "react-icons/rx";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const [selectedBookingId, setSelectedBookingId] = useState(null); // For identifying booking
  const [rating, setRating] = useState(0); // Rating state
  const [comment, setComment] = useState(""); // Comment state

  // Ensure user is properly fetched from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchBookings = async () => {
      const token = JSON.parse(localStorage.getItem("token"));

      if (user?._id && token) {
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
          const fetchedBookings = response.data || [];

          // Now fetch the service details for each booking
          const bookingsWithServices = await Promise.all(
            fetchedBookings.map(async (booking) => {
              if (booking.services && booking.services.length > 0) {
                const serviceId = booking.services[0].id;
                try {
                  const serviceResponse = await axios.get(
                    `${BASE_URL}/services/${serviceId}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  // Add service details to the booking
                  booking.serviceDetails = serviceResponse.data;

                  // Check if the user has already reviewed the service
                  booking.hasReviewed = serviceResponse.data?.reviews?.some(
                    (review) => review.user === user._id
                  );
                } catch (error) {
                  console.error(
                    `Error fetching service details for service ID: ${serviceId}`,
                    error
                  );
                }
              }
              return booking;
            })
          );

          setBookings(bookingsWithServices);
        } catch (error) {
          toast.error("Failed to fetch bookings");
          console.error("Error fetching bookings", error);
        }
      }
    };

    fetchBookings();
  }, [user?._id]);

  const filteredBookings = bookings.filter((booking) => {
    const isUpcoming = new Date(booking.date) >= new Date();
    const isCompleted = booking.status === "completed";

    if (activeTab === "upcoming") {
      return isUpcoming && !isCompleted; // Only upcoming and not completed
    } else if (activeTab === "past") {
      return isCompleted; // Completed past bookings
    }
    return false;
  });

  const handleReviewClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowModal(true); // Open the modal
  };

  const handleReviewSubmit = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    // Find the booking by selectedBookingId to extract serviceId
    const booking = bookings.find((b) => b._id === selectedBookingId);

    // Ensure the booking and services exist
    if (!booking || !booking.services || booking.services.length === 0) {
      toast.error("No service found for this booking.");
      return;
    }

    const serviceId = booking.services[0].id; // Extract the first service's ID

    try {
      await axios.post(
        `${BASE_URL}/bookings/booking/${selectedBookingId}/review`, // Send bookingId in the URL
        {
          serviceId, // Send the first service ID in the data
          rating,
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the booking to reflect that the review has been submitted
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b._id === selectedBookingId ? { ...b, hasReviewed: true } : b
        )
      );

      toast.success("Review submitted successfully!");
      setShowModal(false); // Close the modal
    } catch (error) {
      toast.error("Failed to submit review");
      console.error("Error submitting review", error);
    }
  };

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
                      booking.status.slice(1)}
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
                {activeTab === "past" && !booking.hasReviewed && (
                  <button
                    onClick={() => handleReviewClick(booking._id)}
                    className="mt-2 bg-blue-500 text-white text-sm px-4 py-2 rounded-lg"
                  >
                    Give a Review
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Review */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My Review</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-black hover:text-gray-500"
              >
                <RxCross1 />
              </button>
            </div>

            <div className="mb-4 ">
              <label className="block text-gray-700 mb-2 ">
                General Rating
              </label>
              <div className="flex space-x-2 items-center justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Review</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your experience?"
                className="block w-full mt-1 p-2 border rounded-md"
                rows="4"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleReviewSubmit}
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
