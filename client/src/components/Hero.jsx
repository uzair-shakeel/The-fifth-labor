import React from "react";
import image from "../../public/hero.webp";
const Hero = () => {
  return (
    <section
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="container mx-auto flex flex-col justify-center items-center h-full text-center">
        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          #1 Super app for all home services
        </h1>

        {/* Search Bar */}
        <div className="bg-white shadow-lg rounded-full px-4 py-2 flex items-center space-x-2 w-full max-w-lg">
          <i className="fas fa-map-marker-alt text-blue-500"></i>
          <input
            type="text"
            placeholder="Search for area, street name, landmark..."
            className="flex-grow outline-none text-sm"
          />
          <button className="bg-blue-500 text-white rounded-full px-4 py-2 text-sm">
            Set my location
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
