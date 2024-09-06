import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/BaseURL";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/bookings/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log("data", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch booking details.");
        }

        setBooking(data);
      } catch (error) {
        toast.error(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!booking) {
    return <div>No booking details found.</div>;
  }

  const { customer } = booking;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 font-semibold text-2xl">
        Booking Details
      </h1>
      <div className="card p-4 shadow-lg rounded-2">
        <h2 className="mb-4 text-xl font-semibold underline">
          Customer Information
        </h2>
        <div className="row mb-4">
          <div className="col-md-6">
            <p>
              <strong>Customer ID:</strong>
            </p>
            <p>{customer._id}</p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Name:</strong>
            </p>
            <p>{customer.name}</p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Email:</strong>
            </p>
            <p>{customer.email}</p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Address:</strong>
            </p>
            <p>{booking.address}</p>
          </div>
        </div>

        <h2 className="mb-4 text-xl font-semibold underline">
          Service Information
        </h2>
        {booking.services.map((service, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-4">
              <p>
                <strong>Service Name:</strong>
              </p>
              <p>{service.name}</p>
            </div>
            <div className="col-md-4">
              <p>
                <strong>Quantity:</strong>
              </p>
              <p>{service.quantity}</p>
            </div>

            <div className="col-md-4">
              <p>
                <strong>Sub-Category:</strong>
              </p>
              <p>{service.subCategory}</p>
            </div>
          </div>
        ))}
        <div className="row mb-4">
          {booking.category && (
            <div className="col-md-6">
              <p>
                <strong>Category:</strong>
              </p>
              <p>{booking.category}</p>
            </div>
          )}

          {booking.hours && (
            <div className="col-md-6">
              <p>
                <strong>Hours:</strong>
              </p>
              <p>{booking.hours} hours</p>
            </div>
          )}
          {booking.cleaner && (
            <div className="col-md-6">
              <p>
                <strong>Cleaner:</strong>
              </p>
              <p>{booking.cleaner}</p>
            </div>
          )}
          {booking.professional && (
            <div className="col-md-6">
              <p>
                <strong>Professional:</strong>
              </p>
              <p>{booking.professional}</p>
            </div>
          )}
          {booking.cleaningMaterial && (
            <div className="col-md-6">
              <p>
                <strong>Cleaning Material:</strong>
              </p>
              <p>{booking.cleaningMaterial === true ? "Yes" : "No"}</p>
            </div>
          )}

          <div className="col-md-6">
            <p>
              <strong>Total:</strong>
            </p>
            <p>{booking.total}</p>
          </div>
        </div>

        <h2 className="mb-4 text-xl font-semibold underline">
          Booking Information
        </h2>
        <div className="row mb-4">
          <div className="col-md-4">
            <p>
              <strong>Date:</strong>
            </p>
            <p>{new Date(booking.date).toLocaleDateString()}</p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Time:</strong>
            </p>
            <p>{booking.time}</p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Description:</strong>
            </p>
            <p>{booking.description}</p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Status:</strong>
            </p>
            <p>{booking.status}</p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Notes:</strong>
            </p>
            <p>{booking.notes}</p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Created At:</strong>
            </p>
            <p>{new Date(booking.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
