import React, { useEffect, useState } from "react";
import "./styles/dashboard.css";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/BaseURL";

const Dashboard = () => {
  const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);

        try {
          const token = JSON.parse(localStorage.getItem("token"));

          if (!token) {
            throw new Error("Token not found in cookies");
          }

          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const res = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: headers,
          });
          if (!res.ok) {
            throw new Error(
              `Failed to fetch data from ${url}. Status: ${res.status} - ${res.statusText}`
            );
          }

          const result = await res.json();
          setData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [url]);

    return { data, loading, error };
  };

  const {
    data: users,
    loading: loadingUsers,
    error: errorUsers,
  } = useFetch(`${BASE_URL}/users`);

  const {
    data: orders,
    loading: loadingOrders,
    error: errorOrders,
  } = useFetch(`${BASE_URL}/bookings`);
  const {
    data: services,
    loading: loadingservices,
    error: errorservices,
  } = useFetch(`${BASE_URL}/services`);

  // Categorize users
  const admins = users.filter((user) => user.role === "admin");
  const regularUsers = users.filter((user) => user.role === "user");

  return (
    <div className="dashboard container pt-4">
      <div className="row align-item-center justify-content-center">
        <h1 className="dashboard-heading">Dashboard</h1>
        <h5 className="ps-3 pt-3 mt-5 dashboard-text">General Report</h5>
        <Link
          to="/users"
          className="general-box mt-5 border-2 align-items-center justify-content-center d-flex flex-column shadow-xl col-lg-3 col-md-4"
        >
          <h3>Users</h3>
          <h3 className="pt-3">
            {loadingUsers && <span>Loading...</span>}
            {errorUsers && <span>{errorUsers}</span>}
            {!loadingUsers && !errorUsers && regularUsers.length}
          </h3>
        </Link>
        <Link
          to="/orders"
          className="general-box mt-5 border-2 align-items-center justify-content-center d-flex flex-column shadow-xl col-lg-3 col-md-4"
        >
          <h3>Bookings</h3>
          <h3 className="pt-3">
            {loadingOrders && <span>Loading...</span>}
            {errorOrders && <span>{errorOrders}</span>}
            {!loadingOrders && !errorOrders && orders.length}
          </h3>
        </Link>
        <Link
          to="/menu"
          className="general-box mt-5 border-2 align-items-center justify-content-center d-flex flex-column shadow-xl col-lg-3 col-md-4"
        >
          <h3>Services</h3>
          <h3 className="pt-3">
            {loadingservices && <span>Loading...</span>}
            {errorservices && <span>{errorservices}</span>}
            {!loadingservices && !errorservices && services.length}
          </h3>
        </Link>
        <Link
          to="/admins"
          className="general-box mt-5 border-2 align-items-center justify-content-center d-flex flex-column shadow-xl col-lg-3 col-md-4"
        >
          <h3>Admins</h3>
          <h3 className="pt-3">
            {loadingUsers && <span>Loading...</span>}
            {errorUsers && <span>{errorUsers}</span>}
            {!loadingUsers && !errorUsers && admins.length}
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
