import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/BaseURL";
import { toast } from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const Orders = () => {
  const [status, setStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsername = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await fetch(`${BASE_URL}/user/getUser/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: headers,
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch data. Status: ${res.status} - ${res.statusText}`
        );
      }

      const result = await res.json();
      return result.data.firstName;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const ordersResponse = await fetch(`${BASE_URL}/bookings`, {
        method: "GET",
        credentials: "include",
        headers: headers,
      });

      if (!ordersResponse.ok) {
        throw new Error(
          `Failed to fetch orders. Status: ${ordersResponse.status} - ${ordersResponse.statusText}`
        );
      }

      const ordersData = await ordersResponse.json();

      // Filter orders based on status
      const filteredOrders =
        status === ""
          ? ordersData
          : ordersData.filter((order) => order.status === status);

      setOrders(filteredOrders);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status]); // Re-fetch data when status changes

  const handleAction = async (orderId, newStatus) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${BASE_URL}/bookings/booking/${orderId}`, {
        method: "PUT",
        headers: headers,
        credentials: "include",
        body: JSON.stringify({ status: newStatus.toLowerCase() }),
      });

      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message || "Failed to update status");
        return;
      }

      toast.success("Successfully Updated.");
      setTimeout(() => {
        fetchData(); // Refresh the data
      }, 1000);
    } catch (err) {
      toast.error("Error during updating catch.");
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="data-box container-fluid pt-4">
      <div className="row align-item-center justify-content-center">
        <h1 className="dashboard-heading">Orders</h1>
        <div className="d-flex align-item-center justify-content-between pt-5 flex-column flex-sm-row">
          <div className="mt-3">
            <h5 className="dashboard-text">All Orders</h5>
          </div>
          <div className="d-flex gap-1 mb-1 align-items-end text-white">
            <button
              className={`filter-btn btn btn-light  ${
                status === "" ? "active text-white " : ""
              }`}
              onClick={() => setStatus("")}
            >
              All
            </button>
            <button
              className={`filter-btn btn btn-light ${
                status === "confirmed" ? "active text-white " : ""
              }`}
              onClick={() => setStatus("confirmed")}
            >
              Confirmed
            </button>
            <button
              className={`filter-btn btn btn-light ${
                status === "cancelled" ? "active text-white " : ""
              }`}
              onClick={() => setStatus("cancelled")}
            >
              Cancelled
            </button>
            <button
              className={`filter-btn btn btn-light ${
                status === "completed" ? "active text-white " : ""
              }`}
              onClick={() => setStatus("completed")}
            >
              Completed
            </button>
          </div>
        </div>
        <div className="col-12 table-responsive">
          <table className="table table-box tours-table shadow">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  #
                </th>
                <th scope="col">FirstName</th>
                <th scope="col">Items</th>
                <th scope="col">Address</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col">Details</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7}>Loading.......</td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={7}>{error}</td>
                </tr>
              )}
              {!loading &&
                !error &&
                orders.map((order, index) => (
                  <tr key={order._id}>
                    <th scope="row" className="text-center">
                      {index + 1}
                    </th>
                    <td>{order?.customer?.name}</td>
                    <td>{formatDate(order?.date)}</td>
                    <td>{order?.time}</td>
                    <td>{order?.total}</td>
                    <td className="text-uppercase">{order?.status}</td>
                    <td className="text-uppercase">
                      <Link to={`/booking/${order._id}`}>
                        <button className="px-3 py-1 bg-[#00C3FF] hover:bg-[#4cadca] hover:text-white duration-200 rounded-md">
                          View Details
                        </button>
                      </Link>
                    </td>
                    <td className="text-center">
                      {order.status === "confirmed" ? (
                        <>
                          <button
                            className="btn btn-light action-btn text-white"
                            onClick={() =>
                              handleAction(order?._id, "completed")
                            }
                            type="button"
                          >
                            <FaCheck size={20} />{" "}
                          </button>
                          &nbsp; / &nbsp;
                          <button
                            className="btn btn-light action-btn text-white"
                            onClick={() =>
                              handleAction(order?._id, "cancelled")
                            }
                            type="button"
                          >
                            <RxCross2 size={20} />{" "}
                          </button>
                        </>
                      ) : null}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
