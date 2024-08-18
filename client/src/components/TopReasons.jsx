import React from "react";

const TopReasons = () => {
  const reasons = [
    {
      icon: "⭐", // You can replace this with an actual image or SVG
      title: "Top rated professionals",
      description:
        "Our professionals are reliable & well-trained, with an average rating of 4.78 out of 5!",
    },
    {
      icon: "📅",
      title: "Same-day availability",
      description:
        "Book in less than 60 seconds, and even select same-day slots.",
    },
    {
      icon: "📊",
      title: "Top quality, value for money services",
      description:
        "Our professionals are equipped with the best tools and our services are always priced with you in mind.",
    },
    {
      icon: "📱",
      title: "Super app",
      description:
        "Being a Super app means we’ve got the widest range of home services, so we’ve got you covered!",
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          There are so many reasons to love Justlife!
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12">
          Here are the top 4!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <div className="text-6xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopReasons;
