import React, { useState, useRef } from "react";
import {
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

const placesLibrary = ["places"];

const MapWithAutocomplete = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
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
      console.log(newPosition)
      setSelectedAddress(place.formatted_address);
    }
  };

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="map-container">
      <div className="border-b mt-2">
        <label
          htmlFor="floating_outlined"
          className="text-sm text-gray-500 mt-4"
        >
          Search Location
        </label>
        {isLoaded && (
          <Autocomplete
            onLoad={(ref) => (inputRef.current = ref)}
            onPlaceChanged={handleSelectAddress}
            options={{
              componentRestrictions: { country: "AE" }, // Restrict to UAE
            }}
          >
            <input
              type="text"
              placeholder="Search for Address"
              className="border-b block p-3 w-full text-sm text-gray-900 bg-transparent border-1 outline-0"
            />
          </Autocomplete>
        )}
      </div>
      <div className="address-autocomplete">
        {selectedAddress && (
          <p className="mt-2 text-sm text-gray-600">
            Selected Address: {selectedAddress}
          </p>
        )}
      </div>
    </div>
  );
};

export default MapWithAutocomplete;