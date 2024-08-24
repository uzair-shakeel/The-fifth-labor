import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import axios from "axios";
import { BASE_URL } from "../../utils/BaseURL";

const CleaningServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get(`${BASE_URL}/categories`);
        setServices(response.data);
      } catch (err) {
        setError("Failed to fetch services.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Adjust the skeleton loader to fit your design
  const renderSkeleton = () => (
    <ContentLoader
      speed={2}
      width="100%"
      height={200}
      viewBox="0 0 400 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />{" "}
      {/* Image Skeleton */}
      <rect x="10" y="170" rx="4" ry="4" width="80%" height="100%" />{" "}
      {/* Text Skeleton */}
    </ContentLoader>
  );

  if (error) return <p>{error}</p>;

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-2xl font-semibold text-center">General Cleaning</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>{renderSkeleton()}</div>
            ))
          : services.map((service, index) => (
              <Link
                to={`/checkout/${service._id}/step-1`}
                key={index}
                className="flex flex-col items-center group"
              >
                <div
                  className="w-full h-[160px] bg-cover bg-center rounded-md mb-2 relative overflow-hidden"
                  style={{ backgroundImage: `url(${service.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-0 hover:opacity-0 transition-opacity duration-300"></div>
                </div>
                <p className="text-lg font-medium">{service.name}</p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CleaningServices;
