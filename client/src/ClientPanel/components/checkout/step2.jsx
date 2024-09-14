import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/BaseURL";
import { useParams } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import FrequencyModal from "../FrequencyModal"; // Assuming the modal is in a separate file

// Helper function to truncate text
const truncateText = (text, length) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const Step2 = ({
  onNext,
  onAddService,
  onUpdateQuantity,
  userData,
  selectedFrequency,
  setSelectedFrequency,
}) => {
  const [addons, setAddons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [displayAddons, setDisplayAddons] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories/${id}`);
        const allAddons = response?.data?.services || [];
        setAddons(allAddons);
      } catch (error) {
        console.error("Error fetching add-ons:", error);
      }
    };

    fetchAddons();
  }, [id]);

  useEffect(() => {
    if (addons.length > 0) {
      const userServicesIds = userData.services.map((service) => service._id);
      const remainingAddons = addons.filter(
        (addon) => !userServicesIds.includes(addon._id)
      );

      if (addons.length === 1 && remainingAddons.length === 0) {
        onNext();
        return;
      }

      const randomAddons = remainingAddons
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      setDisplayAddons(randomAddons);
    }
  }, [addons, userData, onNext]);

  const handleAddAddon = (addon) => {
    const newQuantity = 1;

    setQuantities((prev) => ({
      ...prev,
      [addon._id]: newQuantity,
    }));

    const selectedAddon = {
      ...addon,
      quantity: newQuantity,
    };

    onAddService(selectedAddon);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle selected frequency
  const handleSelectFrequency = (frequency) => {
    setSelectedFrequency(frequency);
    userData.frequency = frequency;
    console.log("Selected frequency:", frequency); // You can replace this with your step1 process logic
  };

  return (
    <>
      <div className="relative w-full max-w-screen-lg bg-white mx-auto flex flex-col min-h-screen">
        <div
          className="overflow-y-auto no-scrollbar flex-1"
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          <div className="mb-4">
            <h3 className="text-xl font-bold mt-10 uppercase mb-2">
              People also added
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayAddons.map((addon) => (
                <li
                  key={addon._id}
                  className="bg-gray-100 rounded-3xl shadow-md"
                >
                  <div className="flex flex-col gap-3">
                    <div className="h-40 rounded-t-3xl overflow-hidden">
                      <img
                        src={addon.imageUrl}
                        alt={addon.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col p-2 justify-between flex-1">
                      <div>
                        <div className="text-lg font-bold">
                          {truncateText(addon.name, 18)}
                        </div>
                        <div className="text-gray-600 text-sm">
                          {truncateText(addon.description, 70)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 mb-8">
                        <div>
                          <span className="text-md font-semibold">
                            AED {addon.discountedPrice}
                          </span>
                          {addon.price === 0 ? null : (
                            <span className="text-gray-400 line-through ml-2">
                              AED {addon.price}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddAddon(addon)}
                        className="bg-blue-500 flex justify-center items-center gap-2 font-semibold p-2 px-4 rounded-full text-white cursor-pointer"
                      >
                        Add <FaPlus />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-white border-t p-2 border-gray-300">
          <button
            onClick={onNext}
            className="bg-yellow-400 w-full rounded-full text-white px-4 py-2 font-bold"
          >
            Next
          </button>
        </div>
      </div>
      {/* Render FrequencyModal if isModalOpen is true */}
      {isModalOpen && (
        <FrequencyModal
          onClose={handleCloseModal}
          onSelectFrequency={handleSelectFrequency}
        />
      )}
    </>
  );
};

export default Step2;
