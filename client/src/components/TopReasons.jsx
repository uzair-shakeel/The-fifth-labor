import React from "react";

const TopReasons = () => {
  const reasons = [
    {
      icon: "⭐",
      image:
        "https://d222mnpmkyzhbp.cloudfront.net/prod/assets/static/svgs/star-lg.svg",
      title: "Top rated professionals",
      description:
        "Our professionals are reliable & well-trained, with an average rating of 4.78 out of 5!",
    },
    {
      icon: "📅",
      image:
        "https://d222mnpmkyzhbp.cloudfront.net/prod/assets/static/svgs/schdle_lg.svg",
      title: "Same-day availability",
      description:
        "Book in less than 60 seconds, and even select same-day slots.",
    },
    {
      icon: "📊",
      image:
        "https://d222mnpmkyzhbp.cloudfront.net/prod/assets/static/svgs/gph-lg.svg",
      title: "Top quality, value for money services",
      description:
        "Our professionals are equipped with the best tools and our services are always priced with you in mind.",
    },
    {
      icon: "📱",
      image:
        "https://d222mnpmkyzhbp.cloudfront.net/prod/assets/static/svgs/frame.svg",
      title: "Super app",
      description:
        "Being a Super app means we’ve got the widest range of home services, so we’ve got you covered!",
    },
    {
      icon: "💬", // You can use an emoji or an icon for WhatsApp
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg", // WhatsApp logo
      title: "Instant Support",
      description:
        "Get instant support and quick responses through WhatsApp. We're here to help you anytime!",
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          There are so many reasons to love The Fifth Labor!
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12">
          Here are the top 5!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-6 w-[300px] h-[300px] flex flex-col items-center justify-center rounded-lg text-center shadow-lg"
            >
              <img
                src={reason.image}
                alt={reason.title}
                className="mx-auto mb-4 w-24 h-24 object-contain"
              />
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
