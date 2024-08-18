import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import toast
import { BASE_URL } from "../../utils/BaseURL";
import { RxCross2 } from "react-icons/rx";

const mapContainerStyle = {
  width: "100%",
  height: "250px",
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

const LocationMarker = ({ setMapCenter }) => {
  useMapEvents({
    click(e) {
      const newPosition = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };
      setMapCenter(newPosition);
    },
  });
  return null;
};

const MapModal = ({ isOpen, onClose }) => {
  const [mapCenter, setMapCenter] = useState(center);

  const [houseNumber, setHouseNumber] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  const handleSave = async () => {
    const locationData = {
      houseNumber,
      streetNumber,
      city,
      zipcode,
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/users/profile`,
        locationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // Replace with your actual API endpoint
      if (response.status === 200) {
        toast.success("Welcome to The Fifth Labour!");
        onClose(); // Close the modal after successful save
      } else {
        toast.error("Error Updating Data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data. Please try again.");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 max-w-lg max-h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Your location</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <RxCross2 size={25} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[70vh]">
          <div className="relative">
            <MapContainer
              center={mapCenter}
              zoom={15}
              style={mapContainerStyle}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={mapCenter} icon={customIcon} />
              <LocationMarker setMapCenter={setMapCenter} />
            </MapContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-gray-700 text-white px-2 py-1 rounded-lg">
                Move the map to set the exact position
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                HOUSE / FLAT #
              </label>
              <input
                type="text"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                placeholder="Enter your house or flat number"
                className="w-full p-2 mt-1 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                STREET #
              </label>
              <input
                type="text"
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
                placeholder="Enter your street number"
                className="w-full p-2 mt-1 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CITY
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                className="w-full p-2 mt-1 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ZIPCODE
              </label>
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Enter your zipcode"
                className="w-full p-2 mt-1 border rounded-lg"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="mt-4 w-full bg-yellow-400 text-white p-2 rounded-lg"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
