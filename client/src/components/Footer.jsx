import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import appStore from "../../public/appstore.png";
import playStore from "../../public/playstore.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Services Section */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            "Maid Service",
            "Carpet Cleaning",
            "Mattress Cleaning",
            "Sofa Cleaning",
            "Curtain Cleaning",
            "Deep Cleaning",
            "Move In & Out Cleaning Services",
            "House Cleaning",
            "Laundry & Dry Cleaning",
            "AC Cleaning Service",
            "Disinfection Service",
            "Covid-19 PCR Test at Home",
            "Women's Salon",
            "Women's Spa",
            "Furniture Cleaning",
            "Lab Tests at Home",
            "Pest Control",
            "Men's Spa",
            "Men's Grooming",
            "Hair Care",
            "Pet Grooming",
            "IV Therapy",
            "Babysitting At Home",
            "Car Wash At Home",
            "Plumber Services",
            "Handyman Services",
            "Electrician Services",
            "Home Painting",
            "Personal Trainer",
            "Nail Couture",
            "Packers and Movers",
            "Physiotherapy at Home",
            "Body Adjustment",
            "Personal Nutritionist",
            "Part Time Maid Services",
            "Psychotherapy & Counselling",
            "Nurse Care at Home",
            "Mobile Ice Bath",
            "Lashes and Brows at Home",
            "Vaccines at Home",
            "Spray Tanning",
            "Commercial Cleaning",
            "Office Cleaning",
            "Villa Cleaning",
            "Henna Service",
            "Housekeeping Services",
            "Floor Cleaning",
            "Doctor on Call",
            "Facial Treatment Service",
            "Eyebrow Threading",
            "Flu Vaccine",
            "Apartment Cleaning",
            "Oxygen Therapy",
            "Cat Grooming",
          ].map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-full px-2 py-1 text-sm text-center"
            >
              {service}
            </div>
          ))}
        </div>

        {/* Location Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-4 mb-8">
          <div>
            <h4 className="font-semibold mb-2">United Arab Emirates</h4>
            <div className="flex justify-center space-x-2">
              {["Dubai", "Abu Dhabi", "Sharjah", "Ajman"].map((city, index) => (
                <span
                  key={index}
                  className="bg-gray-800 rounded-full px-4 py-2"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Saudi Arabia</h4>
            <div className="flex justify-center space-x-2">
              {["Jeddah", "Riyadh"].map((city, index) => (
                <span
                  key={index}
                  className="bg-gray-800 rounded-full px-4 py-2"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Qatar</h4>
            <div className="flex justify-center space-x-2">
              {["Doha"].map((city, index) => (
                <span
                  key={index}
                  className="bg-gray-800 rounded-full px-4 py-2"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div> */}

        {/* App Store and Social Media Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <a href="#" className="bg-black rounded-md p-2">
              <img src={appStore} alt="App Store" className="h-10" />
            </a>
            <a href="#" className="bg-black rounded-md p-2">
              <img src={playStore} alt="Google Play" className="h-10" />
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="bg-gray-800 p-2 rounded-full">
              <FaFacebook />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full">
              <FaTwitter />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="flex justify-center space-x-4 text-sm">
          {["F.A.Q", "Terms", "Privacy", "Sitemap", "Career"].map(
            (link, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-400 hover:text-white"
              >
                {link}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
