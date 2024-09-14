import image from "../../public/hero.webp";
import React, { useState, useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const placesLibrary = ["places"];

const Hero = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [locationSet, setLocationSet] = useState(false); // State to hide the component
  const inputRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCaeJxpiKN3NSoi-B8MR6RidOgA0yteFlo",
    libraries: placesLibrary,
  });

  const handleSelectAddress = () => {
    const place = inputRef.current.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      const newPosition = {
        lat: location.lat(),
        lng: location.lng(),
      };
      console.log(newPosition);
      setSelectedAddress(place.formatted_address);
    }
  };

  const handleSetLocation = () => {
    if (selectedAddress) {
      setLocationSet(true); // Hide the component when location is set
    }
  };

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  // Conditionally render the component based on whether the location is set
  if (locationSet) {
    return null;
  }

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
        <div className=" w-[95%] md:w-2/4">
          {isLoaded && (
            <Autocomplete
              onLoad={(ref) => (inputRef.current = ref)}
              onPlaceChanged={handleSelectAddress}
              options={{
                componentRestrictions: { country: "AE" }, // Restrict to UAE
              }}
            >
              <div className="flex flex-col  p-4 bg-white rounded-lg shadow-md w-full ">
                <p className="font-bold text-xl text-start pb-3">
                  Where would you like to receive your service?
                </p>
                <div className="rounded-lg border-2 flex  w-full border-gray-300 focus:outline-none">
                  <input
                    type="text"
                    placeholder="Search for area, street name, landmark..."
                    className="flex-grow p-3 text-sm rounded-lg outline-none"
                  />
                  <button
                    onClick={handleSetLocation}
                    className="ml-3 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg flex items-center"
                  >
                    Set my location
                  </button>
                </div>
              </div>
            </Autocomplete>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
