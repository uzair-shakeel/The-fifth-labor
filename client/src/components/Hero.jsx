import React, { useState, useEffect, useCallback } from "react";
import image from "../../public/hero.webp";
import { toast } from "react-hot-toast";
import { TiInfo } from "react-icons/ti";
import axios from "axios";
import debounce from "lodash.debounce"; // Import debounce from lodash

const Hero = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Bounding box for Abu Dhabi
  const boundingBox = {
    north: 24.5878,
    south: 24.44,
    east: 54.5566,
    west: 54.2634,
  };

  // Debounced function to fetch suggestions
  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (query) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search`,
            {
              params: {
                format: "json",
                q: query,
                addressdetails: 1,
                bounded: 1,
                viewbox: `${boundingBox.west},${boundingBox.south},${boundingBox.east},${boundingBox.north}`,
              },
            }
          );
          setSuggestions(response.data.map((result) => result.display_name));
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  ); // Empty dependency array ensures debounce function is memoized

  useEffect(() => {
    fetchSuggestions(input);
  }, [input, fetchSuggestions]);

  const showToast = () => {
    toast("Log In Please", {
      icon: <TiInfo className="text-white" size={20} />,
      style: {
        borderRadius: "8px",
        background: "#888",
        color: "#fff",
      },
    });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
  };

  return (
    <section
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="container max-w-7xl mx-auto flex flex-col justify-center items-center h-full text-center">
        {/* Title */}
        <h1 className="text-5xl font-[800] uppercase text-gray-800 mb-6">
          Keeping Abu Dhabi Clean
        </h1>

        {/* Search Bar */}
        <div className="relative bg-white shadow-lg rounded-full px-4 py-2 flex items-center space-x-2 w-full max-w-lg">
          <i className="fas fa-map-marker-alt text-blue-500"></i>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Search for area, street name, landmark..."
            className="flex-grow outline-none text-sm"
          />
          <button
            onClick={showToast}
            className="bg-blue-500 text-white rounded-full px-4 py-2 text-sm"
          >
            Set my location
          </button>
          {isLoading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          )}
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border rounded-lg mt-2 w-full max-w-lg shadow-lg z-10 top-full left-0">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
