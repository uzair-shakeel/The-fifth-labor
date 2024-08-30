// src/ComingSoon.js
import React, { useEffect } from "react";

const ComingSoon = () => {
  useEffect(() => {
    // Smoothly scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []); // Empty dependency array ensures this effect runs only once (on mount)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Our app is launching soon! We’re working hard to bring you the best
          experience.
        </p>
        <p className="text-lg text-gray-500 mb-12">
          Stay tuned for updates and announcements.
        </p>
        <div className="flex flex-col items-center">
          <svg
            className="w-20 h-20 text-blue-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M4 12a8 8 0 0 1 8-8v8l4 4" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
