import React from "react";
import image from "../../public/download.webp";
import appStore from "../../public/appstore.png";
import playStore from "../../public/playstore.png";

const DownloadAppSection = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between p-8 bg-gray-100">
      {/* Left Side: Text Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-sm text-gray-600">DOWNLOAD OUR SUPER APP!</h2>
        <h1 className="text-3xl font-bold mt-2">
          Manage all to-dos with a single tap!
        </h1>
        <p className="mt-4 text-gray-700">
          Book and manage your appointments, view your professional’s profile
          and ratings, get the latest offers, and much more.
        </p>
        <div className="mt-6 flex justify-center md:justify-start">
          <a href="#" className="mr-4">
            <img src={appStore} alt="Download on the App Store" />
          </a>
          <a href="#">
            <img src={playStore} alt="Download on Google Play" />
          </a>
        </div>
      </div>

      {/* Right Side: Image Section */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <img
          src={image} // Replace with your image path
          alt="App Preview"
          className="mx-auto md:ml-auto md:mr-0"
        />
      </div>
    </div>
  );
};

export default DownloadAppSection;
