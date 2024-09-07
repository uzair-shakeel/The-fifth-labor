import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import appStore from "../../public/appstore.png";
import playStore from "../../public/playstore.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import { BASE_URL } from "../utils/BaseURL";

const Footer = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Replaces useHistory for navigation

  useEffect(() => {
    // Fetch services and categories from the API using Axios
    const fetchServicesAndCategories = async () => {
      try {
        const [servicesResponse, categoriesResponse] = await Promise.all([
          axios.get(`${BASE_URL}/services`),
          axios.get(`${BASE_URL}/categories`),
        ]);

        const uniqueServices = servicesResponse.data.filter(
          (service, index, self) =>
            index ===
            self.findIndex((s) => s.subCategory === service.subCategory)
        );

        setServices(uniqueServices || []);
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchServicesAndCategories();
  }, []);

  // Handle click on service chip
  const handleChipClick = (serviceName) => {
    const matchingCategory = categories.find(
      (category) => category._id === serviceName
    );

    if (matchingCategory) {
      navigate(`/checkout/${matchingCategory._id}/step-1`); // Use navigate for redirection
    } else {
      console.log("No matching category found");
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Services Section */}
        <div className="flex flex-wrap text-[7px] md:text-sm gap-[8px] mb-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-full px-2 py-1 text-sm text-center cursor-pointer"
              onClick={() => handleChipClick(service.category)} // Click handler
            >
              {service.subCategory}
            </div>
          ))}
        </div>

        {/* App Store and Social Media Section */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex space-x-4">
            <Link to={"/coming-soon"} className="bg-black rounded-md p-2">
              <img src={appStore} alt="App Store" className="h-10" />
            </Link>
            <Link to={"/coming-soon"} className="bg-black rounded-md p-2">
              <img src={playStore} alt="Google Play" className="h-10" />
            </Link>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="bg-gray-800 p-2 rounded-full">
              <FaFacebook />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full">
              <FaTwitter />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="flex justify-center space-x-4 text-sm">
          {["F.A.Q", "Terms", "Privacy", "Sitemap", "Career"].map(
            (link, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-400 hover:text-white"
              >
                {link}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
