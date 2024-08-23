import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure you have axios installed or use fetch API
import { BASE_URL } from "../../utils/BaseURL";
import { Link } from "react-router-dom";

const CleaningServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        setServices(response.data);
      } catch (err) {
        setError("Failed to fetch services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="py-8 px-4">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-2xl font-semibold text-center">General Cleaning</h2>
        {/* <div className="flex items-center space-x-2">
          <a href="#" className="text-blue-600 hover:underline">
            See all
          </a>
          <div className="flex space-x-1">
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              &lt;
            </button>
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              &gt;
            </button>
          </div>
        </div> */}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {services.map((service, index) => (
          <Link
            to={`/checkout/${service._id}`}
            key={index}
            className="flex flex-col items-center"
          >
            <div
              className="w-full h-32 bg-cover bg-center rounded-md mb-2"
              style={{ backgroundImage: `url(${service.imageUrl})` }}
            ></div>
            <p className="text-lg font-medium">{service.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CleaningServices;
