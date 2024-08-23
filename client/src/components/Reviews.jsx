import React from "react";
import Slider from "react-slick"; // Importing react-slick
import {
  FaStar,
  FaStarHalfAlt,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "Nadia",
    rating: 4.8,
    review:
      "It's my first time booking with The Fifth Labor, and it exceeded my expectations. The professional cleaned our house thoroughly; she was very friendly and made sure that everything was clean before she left. It was a great experience indeed, and I will surely book another service with The Fifth Labor.",
    date: "March 2024",
  },
  {
    id: 2,
    name: "John Doe",
    rating: 4.2,
    review:
      "I had a good experience with The Fifth Labor. The cleaning service was satisfactory, and the staff was polite. I would recommend The Fifth Labor for regular cleaning needs.",
    date: "April 2024",
  },
  {
    id: 3,
    name: "Emily Smith",
    rating: 4.5,
    review:
      "The Fifth Labor provided an excellent service. The cleaner was punctual and efficient, leaving my home spotless. I will definitely use their service again!",
    date: "May 2024",
  },
  {
    id: 4,
    name: "Michael Johnson",
    rating: 5.0,
    review:
      "Absolutely fantastic service! The booking process was simple, and the cleaner did a wonderful job. Highly recommended!",
    date: "June 2024",
  },
  {
    id: 5,
    name: "Sophia Lee",
    rating: 3.8,
    review:
      "The service was okay, but I expected a bit more thorough cleaning. The staff was friendly, though, and I might give it another try.",
    date: "July 2024",
  },
  {
    id: 6,
    name: "David Brown",
    rating: 4.7,
    review:
      "Great experience! The cleaner was very professional and took care of all my cleaning needs. I'll be using The Fifth Labor again soon!",
    date: "August 2024",
  },
];

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 right-[-130px] transform text-3xl text-gray-500 p-3 -translate-y-1/2 cursor-pointer bg-gray-200 hover:text-black duration-200  rounded-full z-10"
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 left-[-130px] transform text-3xl text-gray-500 p-3 -translate-y-1/2 cursor-pointer bg-gray-200 hover:text-black duration-200 rounded-full z-10"
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
};

const CustomerSays = () => {
  // Slick slider settings with custom arrows
  const settings = {
    dots: true, // Show dots below the carousel
    infinite: true, // Loop the slides
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Autoplay speed in milliseconds
    nextArrow: <NextArrow />, // Custom next arrow component
    prevArrow: <PrevArrow />, // Custom previous arrow component
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-center bg-gray-100 py-12">
      <h3 className="text-xl font-bold mb-2">
        What customers say about The Fifth Labor
      </h3>
      <p className="text-gray-500 mb-6">
        The Fifth Labor has been rated 4.8 out of 5 based on{" "}
        {testimonials.length} reviews as of {testimonials[0].date}.
      </p>
      <div className="relative w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-4">
              <div className="flex justify-center mb-4">
                <span className="bg-yellow-300 p-2 flex text-white rounded-full">
                  {Array.from({ length: Math.floor(testimonial.rating) }).map(
                    (_, i) => (
                      <FaStar key={i} />
                    )
                  )}
                  {testimonial.rating % 1 !== 0 && <FaStarHalfAlt />}
                </span>
              </div>
              <p className="text-center text-gray-800 text-xl font-semibold mb-4">
                {testimonial.review}
              </p>
              <p className="text-center text-blue-500 text-lg font-semibold">
                {testimonial.name}
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
