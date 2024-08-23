import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/BaseURL";

const Users = () => {
  // Custom hook to fetch data from the API
  const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
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

  // Fetch all messages
  const { data: messages, loading, error } = useFetch(`${BASE_URL}/messages`);

  return (
    <div className="data-box container-fluid pt-4">
      <div className="row align-items-center justify-content-center">
        <h1 className="dashboard-heading">Messages</h1>
        <h5 className="pt-5 mt-3 dashboard-text">All Messages</h5>
        <div className="col-12 table-box">
          <table className="table tours-table shadow">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  #
                </th>
                <th scope="col">Email</th>
                <th scope="col">Message</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={4}>Loading.......</td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={4}>{error}</td>
                </tr>
              )}
              {!loading &&
                !error &&
                messages.map((message, index) => (
                  <tr key={message._id}>
                    <th scope="row" className="text-center">
                      {index + 1}
                    </th>
                    <td>{message.email}</td>
                    <td>{message.message}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
