import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import markerIconPng from "leaflet/dist/images/marker-icon.png"; // Import the icon

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 25.078545, // Example coordinates for Dubai
  lng: 55.139915,
};

// Custom icon for the marker
const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationMarker = ({ setMarkerPosition }) => {
  useMapEvents({
    click(e) {
      setMarkerPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
};

const MapUpdater = ({ markerPosition }) => {
  const map = useMap();
  map.setView(markerPosition); // Update the map's view to the new position

  return null;
};

const MapModal = ({ isOpen, onClose, openAddressModal }) => {
  const [markerPosition, setMarkerPosition] = useState(center);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Handle search input change
  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 3) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle search result click
  const handleSuggestionClick = (lat, lon) => {
    setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
    setSuggestions([]);
  };

  const handleSubmit = () => {
    openAddressModal();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Your location</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &#10005;
          </button>
        </div>
        <div className="p-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for your building or area"
            className="w-full p-2 mb-4 border rounded-lg"
          />
          {suggestions.length > 0 && (
            <ul className="bg-white border rounded-lg absolute z-10 w-full">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() =>
                    handleSuggestionClick(suggestion.lat, suggestion.lon)
                  }
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
          <div className="relative">
            <MapContainer
              center={markerPosition}
              zoom={15}
              style={mapContainerStyle}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={markerPosition}
                icon={customIcon}
                draggable={true}
              />
              <LocationMarker setMarkerPosition={setMarkerPosition} />
              <MapUpdater markerPosition={markerPosition} />
            </MapContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-gray-700 text-white px-2 py-1 rounded-lg">
                Move the map to set the exact position
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-yellow-400 text-white p-2 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
