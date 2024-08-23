import React from "react";

const Banner = () => {
  return (
    <section className="bg-blue-500 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/5 flex justify-center mb-6 md:mb-0">
          <div className="bg-white p-4 rounded-full">
            <svg
              width="108"
              height="108"
              viewBox="0 0 108 108"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3055_42)">
                <path
                  d="M98.4023 17.6576L57.9023 0.782566C56.874 0.354152 55.1264 0.00146484 54.0127 0.00146484C52.8922 0.00146484 51.1545 0.354152 50.1187 0.782566L9.62086 17.6576C5.84297 19.2164 3.375 22.9078 3.375 26.8101C3.375 81.2531 43.2844 108 53.9789 108C64.7789 108 104.625 80.9578 104.625 26.8101C104.625 22.9078 102.157 19.2164 98.4023 17.6576Z"
                  fill="white"
                ></path>
              </g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M60.4606 52.1661C60.7334 52.9196 60.8855 53.7152 60.9125 54.5305C60.9396 55.3461 60.8408 56.1499 60.6184 56.9201C60.1733 58.4624 59.2244 59.8606 57.946 60.857C56.6615 61.8581 55.1169 62.416 53.4792 62.4704C51.8415 62.5247 50.2633 62.0704 48.9148 61.1564C47.5734 60.2472 46.5338 58.9149 45.9874 57.4056C45.7146 56.6518 45.5625 55.8562 45.5354 55.0407C45.5084 54.2254 45.6073 53.4215 45.8295 52.6513C46.2692 51.1274 47.2032 49.7413 48.4595 48.7477C51.3035 46.4986 51.7849 42.3713 49.5348 39.5287C47.2847 36.686 43.155 36.2046 40.3111 38.4539C36.8758 41.1704 34.4207 44.822 33.2112 49.014C32.6068 51.1087 32.3372 53.2828 32.4101 55.4761C32.4829 57.6694 32.8961 59.8212 33.6382 61.8713C35.1199 65.9645 37.9276 69.5687 41.5438 72.0196C43.8254 73.5661 45.9447 74.3371 47.1498 74.7043C48.3015 75.055 50.4582 75.602 53.2239 75.6011C56.6815 75.5999 59.3279 74.7431 60.6161 74.2541C61.9201 73.7592 63.9254 72.8415 66.0217 71.2078C69.4675 68.5222 72.0299 64.7399 73.2367 60.5577C73.8411 58.4629 74.1107 56.2885 74.0379 54.095C73.9667 51.9529 73.571 49.8506 72.8612 47.8439L66.0561 26.1983C64.9688 22.7404 61.2826 20.8173 57.8231 21.9052C54.3635 22.992 52.4404 26.6761 53.5277 30.1342L60.4606 52.1661Z"
                fill="#00C3FF"
              ></path>
              <defs>
                <clipPath id="clip0_3055_42">
                  <rect width="108" height="108" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
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
