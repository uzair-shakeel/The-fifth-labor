import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import appStore from "../../public/appstore.png";
import playStore from "../../public/playstore.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Services Section */}
        <div className="flex flex-wrap text-[7px] md:text-sm gap-[8px] mb-8">
          {[
            "Home Cleaning",
            "Apartment Cleaning",
            "Villa Cleaning",
            "Office Cleaning",
            "Carpet Cleaning",
            "Mattress Cleaning",
            "Sofa Cleaning",
            "Curtain Cleaning",
            "Deep Cleaning",
            "Split AC Cleaning",
            "Central & Duct AC Cleaning",
            "Car Cleaning",
            "Motorcycle Cleaning",
            "Hourly Male Office Cleaning",
            "Hourly Male Home Cleaning",
            "House Cleaning",
            "Laundry & Dry Cleaning",
            "AC Cleaning Service",
            "Disinfection Service",
            "Furniture Cleaning",
            "Commercial Cleaning",
            "Office Cleaning",
            "Villa Cleaning",
          ].map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-full px-2 py-1 text-sm text-center"
            >
              {service}
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
