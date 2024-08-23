import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/BaseURL";
import Avatar from "../../public/avatar.jpg";
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const Admins = () => {
  const [totalAdmins, setTotalAdmins] = useState([]);
  const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
      fetchData();
    }, [url]);

    return { data, loading, error, fetchData };
  };

  const {
    data: admins,
    loading,
    error,
    fetchData,
  } = useFetch(`${BASE_URL}/users`);

  const handleChangeRole = async (adminId, value) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${BASE_URL}/users/user-role/${adminId}`, {
        method: "PUT",
        credentials: "include", // Include credentials if needed
        headers: headers,
        body: JSON.stringify({ role: value }), // Include the new role value in the request body
      });

      const data = await response.json(); // Parse the JSON response
      console.log(data);
      if (response.ok) {
        toast.success(data.message || "Successfully Updated.");
        // Fetch updated user data
        fetchData();
      } else {
        toast.error(data.message || "Failed to update role.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating the role.");
    }
  };

  useEffect(() => {
    if (admins) {
      const userCount = admins.filter((admin) => admin.role === "admin");
      setTotalAdmins(userCount);
    }
  }, [admins]);

  const handleDelete = async (userId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token")); // Get the token from localStorage

      await axios.delete(
        `${BASE_URL}/users/user/${userId}`, // Include the userId in the DELETE request URL
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      toast.success("User deleted successfully"); // Show success toast
      fetchData(); // Refresh the data after deleting the user
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user"); // Show error toast
    }
  };

  return (
    <div className="data-box container-fluid pt-4 ">
      <div className="row align-item-center justify-content-center">
        <h1 className="dashboard-heading">Admins</h1>
        <h5 className="pt-5 mt-3 dashboard-text">All Admins</h5>
        <div className="col-12 table-box">
          <table className="table tours-table  shadow">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  #
                </th>
                <th scope="col">Id</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6}>Loading.......</td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={6}>{error}</td>
                </tr>
              )}
              {!loading &&
                !error &&
                totalAdmins?.map((admin, index) => (
                  <tr key={admin._id}>
                    <th scope="row" className="text-center">
                      {index + 1}
                    </th>
                    <td>{admin._id}</td>
                    <td>
                      <img
                        src={admin.photo || Avatar}
                        className="profileimg img-fluid rounded-circle border-2"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                        alt="profile-img"
                      />
                    </td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>
                      <select
                        className="form-select form-options"
                        value={admin.role}
                        onChange={(e) =>
                          handleChangeRole(admin._id, e.target.value)
                        }
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-light action-btn text-white"
                        type="button"
                        onClick={() => handleDelete(admin._id)}
                      >
                        <MdDelete size={25} />
                      </button>
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

export default Admins;
