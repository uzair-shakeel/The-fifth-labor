import React, { useState, useEffect } from "react";
import Slider from "react-slick"; // Importing react-slick
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { BASE_URL } from "../utils/BaseURL";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 -right-6 md:right-[-130px] transform text-2xl md:text-3xl text-gray-500 p-2 md:p-3 -translate-y-1/2 cursor-pointer hover:text-black duration-200 rounded-full z-10"
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 -left-6 md:left-[-130px] transform text-2xl md:text-3xl text-gray-500 p-2 md:p-3 -translate-y-1/2 cursor-pointer hover:text-black duration-200 rounded-full z-10"
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
};

const CustomerSays = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/services/reviews/all`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Slick slider settings with custom arrows
  const settings = {
    dots: false, // Show dots below the carousel
    infinite: true, // Loop the slides
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Autoplay speed in milliseconds
    nextArrow: <NextArrow />, // Custom next arrow component
    prevArrow: <PrevArrow />, // Custom previous arrow component
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="w-full h-full flex flex-col items-center justify-center bg-gray-100 py-8 md:py-12 px-4 md:px-0">
      <h3 className="text-lg md:text-xl font-bold mb-2 text-center">
        What customers say about The Fifth Labor
      </h3>
      <p className="text-gray-500 mb-4 md:mb-6 text-center">
        The Fifth Labor has been rated{" "}
        {testimonials.length
          ? (
              testimonials.reduce((acc, cur) => acc + cur.rating, 0) /
              testimonials.length
            ).toFixed(1)
          : "N/A"}{" "}
        out of 5 based on {testimonials.length} reviews.
      </p>
      <div className="relative w-full max-w-lg md:max-w-3xl bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="p-2 md:p-4">
              <div className="flex justify-center mb-2 md:mb-4">
                <span className="bg-yellow-300 p-1 md:p-2 flex text-white rounded-full">
                  {Array.from({ length: Math.floor(testimonial.rating) }).map(
                    (_, i) => (
                      <FaStar key={i} />
                    )
                  )}
                  {testimonial.rating % 1 !== 0 && <FaStarHalfAlt />}
                </span>
              </div>
              <p className="text-center text-gray-800 text-base md:text-xl font-semibold mb-2 md:mb-4">
                {testimonial.comment}
              </p>
              <p className="text-center text-blue-500 text-sm md:text-lg font-semibold">
                {testimonial.user.name}
              </p>
            </div>
          ))}
        </Slider>
        {/* Arrows are handled by Slick now */}
      </div>
    </section>
  );
};

export default CustomerSays;
