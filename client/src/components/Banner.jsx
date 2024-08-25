import React from "react";

const Banner = () => {
  return (
    <section className="bg-blue-500 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/5 flex justify-center mb-6 md:mb-0">
          <img
            src="/rounded.png"
            alt=""
            className="mr-5 h-40  md:h-auto w-auto"
          />
        </div>
        <div className="md:w-4/5">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            The The Fifth Labor Promise – Excellence in Every Home
          </h2>
          <p className="text-lg md:text-xl">
            At The Fifth Labor, we commit to the highest standards of home care.
            Our trained professionals deliver a superior service experience,
            ensuring your home is in expert hands. Your peace of mind is our
            promise.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
