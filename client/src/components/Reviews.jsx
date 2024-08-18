import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Nadia",
    rating: 4.8,
    review:
      "It's my first time booking with Justlife, and it exceeded my expectations. The professional cleaned our house thoroughly; she was very friendly and made sure that everything was clean before she left. It was a great experience indeed, and I will surely book another service with Justlife.",
    date: "March 2024",
  },
  // Add more testimonials here
];

const CustomerSays = () => {
  const [current, setCurrent] = useState(0);
  const length = testimonials.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(testimonials) || testimonials.length <= 0) {
    return null;
  }

  return (
    <section className="w-full h-full flex flex-col items-center justify-center bg-gray-100 py-12">
      <h3 className="text-xl font-bold mb-2">
        What customers say about Justlife
      </h3>
      <p className="text-gray-500 mb-6">
        Justlife has been rated 4.8 out of 5 based on 1626 reviews as of{" "}
        {testimonials[current].date}.
      </p>
      <div className="relative w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        {testimonials.map((testimonial, index) => (
          <div
            className={
              index === current
                ? "opacity-100 ease-in duration-1000"
                : "opacity-0 ease-out duration-1000"
            }
            key={testimonial.id}
          >
            {index === current && (
              <>
                <div className="flex justify-center mb-4">
                  <span className="bg-yellow-300 p-2 rounded-full">
                    {Array.from({ length: Math.floor(testimonial.rating) }).map(
                      (_, i) => (
                        <span key={i}>⭐</span>
                      )
                    )}
                  </span>
                </div>
                <p className="text-center text-gray-800 text-lg mb-4">
                  {testimonial.review}
                </p>
                <p className="text-center text-blue-500 text-lg font-semibold">
                  {testimonial.name}
                </p>
              </>
            )}
          </div>
        ))}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 ml-2">
          <button
            onClick={prevSlide}
            className="bg-gray-200 p-2 rounded-full focus:outline-none"
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-2">
          <button
            onClick={nextSlide}
            className="bg-gray-200 p-2 rounded-full focus:outline-none"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerSays;
