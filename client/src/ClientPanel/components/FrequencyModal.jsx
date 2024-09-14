import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const FrequencyModal = ({ onClose, onSelectFrequency }) => {
  const [selectedFrequency, setSelectedFrequency] = useState(null);

  const handleFrequencyChange = (event) => {
    setSelectedFrequency(event.target.value);
  };

  const handleSelectClick = () => {
    if (selectedFrequency) {
      onSelectFrequency(selectedFrequency); // Pass the selected frequency to the parent
      onClose(); // Close the modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 h-auto max-h-[80vh] flex flex-col">
        {/* Header: Fixed */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Choose your frequency</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FaTimes />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-grow">
          <div className="space-y-4">
            <div
              className={`border p-4 rounded-lg cursor-pointer ${
                selectedFrequency === "weekly"
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedFrequency("weekly")}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="block font-bold">Weekly</span>
                  <span className="text-green-500 text-sm">10% Off</span>
                </div>
                <input
                  type="radio"
                  name="frequency"
                  value="weekly"
                  checked={selectedFrequency === "weekly"}
                  onChange={handleFrequencyChange}
                  className="form-radio"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Enjoy having the same professional every week. Pause or cancel
                anytime.
              </p>
            </div>

            <div
              className={`border p-4 rounded-lg cursor-pointer ${
                selectedFrequency === "every2weeks"
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedFrequency("every2weeks")}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="block font-bold">Every 2 Weeks</span>
                  <span className="text-green-500 text-sm">5% Off</span>
                </div>
                <input
                  type="radio"
                  name="frequency"
                  value="every2weeks"
                  checked={selectedFrequency === "every2weeks"}
                  onChange={handleFrequencyChange}
                  className="form-radio"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Enjoy having the same professional every 2 weeks. Pause or
                cancel anytime.
              </p>
            </div>

            <div
              className={`border p-4 rounded-lg cursor-pointer ${
                selectedFrequency === "onetime"
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedFrequency("onetime")}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="block font-bold">One Time</span>
                </div>
                <input
                  type="radio"
                  name="frequency"
                  value="onetime"
                  checked={selectedFrequency === "onetime"}
                  onChange={handleFrequencyChange}
                  className="form-radio"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Perfectly pick when your schedule is uncertain.
              </p>
            </div>
          </div>
        </div>

        {/* Footer: Fixed */}
        <div className="mt-4">
          <button
            onClick={handleSelectClick}
            disabled={!selectedFrequency}
            className={`w-full text-white font-bold py-2 px-4 rounded ${
              selectedFrequency
                ? "bg-yellow-500"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrequencyModal;
