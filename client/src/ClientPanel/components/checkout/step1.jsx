import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/BaseURL";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const Step1 = ({ onNext, onAddService, onUpdateQuantity, setName, name }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const categoryRefs = useRef({});
  const contentRef = useRef(null);
  const { id } = useParams(); // Extracts the 'id' from the URL

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories/${id}`);
        setName(response.data.name || []);
        setCategories(response.data.services || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const groupBySubCategory = (categories) => {
    return categories.reduce((acc, category) => {
      if (!acc[category.subCategory]) {
        acc[category.subCategory] = [];
      }
      acc[category.subCategory].push(category);
      return acc;
    }, {});
  };

  const groupedCategories = groupBySubCategory(categories);

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
    if (id && categoryRefs.current[id]) {
      contentRef.current.scrollTo({
        top: categoryRefs.current[id].offsetTop - contentRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleAddService = (service) => {
    setQuantities((prev) => ({
      ...prev,
      [service._id]: 1, // Set initial quantity for the specific service
    }));

    const selectedService = {
      ...service,
      quantity: 1,
    };

    onAddService(selectedService);
  };

  const handleIncreaseQuantity = (service) => {
    setQuantities((prev) => {
      const newQuantity = (prev[service._id] || 1) + 1;
      onUpdateQuantity(service._id, newQuantity);
      return {
        ...prev,
        [service._id]: newQuantity,
      };
    });
  };

  const handleDecreaseQuantity = (service) => {
    setQuantities((prev) => {
      const currentQuantity = prev[service._id] || 1;
      const newQuantity = Math.max(currentQuantity - 1, 0);

      // Update quantity first
      onUpdateQuantity(service._id, newQuantity);

      if (newQuantity === 0) {
        // If the new quantity is 0, remove the service from the quantities object
        const { [service._id]: _, ...rest } = prev;
        return rest;
      }

      // Otherwise, update the service's quantity
      return {
        ...prev,
        [service._id]: newQuantity,
      };
    });
  };

  // Check if any service has been selected
  const isServiceSelected = Object.keys(quantities).length > 0;

  return (
    <div className="relative w-full max-w-screen-lg bg-white mx-auto">
      <div className="sticky top-0 bg-white border-b border-gray-300 z-10">
        <div className="flex no-scrollbar gap-3 pb-3 overflow-x-scroll w-full">
          {Object.keys(groupedCategories).map((subCategory) => (
            <span
              key={subCategory}
              onClick={() => handleCategoryClick(subCategory)}
              className={`rounded-full cursor-pointer flex w-auto font-[600] py-1 px-3 border-2 whitespace-nowrap ${
                selectedCategoryId === subCategory
                  ? "bg-[#D9F6FF] text-[#00C3FF] border-[#00C3FF]"
                  : "bg-white text-black border-black"
              }`}
            >
              {subCategory}
            </span>
          ))}
        </div>
      </div>

      <div
        ref={contentRef}
        className="overflow-y-auto no-scrollbar"
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        <div className="mb-4">
          {Object.keys(groupedCategories).map((subCategory) => (
            <div
              key={subCategory}
              ref={(el) => {
                categoryRefs.current[subCategory] = el;
              }}
            >
              <h3 className="text-xl font-bold mt-10 uppercase mb-2">
                {subCategory}
              </h3>
              <ul className="space-y-3">
                {groupedCategories[subCategory].map((service) => (
                  <li key={service._id} className="ml-4">
                    <div className="flex gap-3 w-full ">
                      <div className="w-[130px] h-full rounded-md overflow-hidden">
                        <img
                          src={service.imageUrl}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="w-full h-full flex flex-col gap-3 justify-between">
                        <div>
                          <div className="text-xl font-[600]">
                            {service.name}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {service.description}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-3">
                            <div className="text-md">
                              AED{" "}
                              {service.discountedPrice
                                ? service.discountedPrice
                                : service.price}
                            </div>
                            {service.price === 0 ? null : (
                              <div className="text-md text-gray-500 line-through">
                                AED {service.price}
                              </div>
                            )}
                          </div>

                          {quantities[service._id] ? (
                            name === "Home Cleaning" ? null : (
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() =>
                                    handleDecreaseQuantity(service)
                                  }
                                  className="bg-[#FF3E3E] p-2 rounded-full text-white cursor-pointer"
                                >
                                  <FaMinus />
                                </button>
                                <span>{quantities[service._id]}</span>
                                <button
                                  onClick={() =>
                                    handleIncreaseQuantity(service)
                                  }
                                  className="bg-[#00C3FF] p-2 rounded-full text-white cursor-pointer"
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            )
                          ) : (
                            <button
                              onClick={() => handleAddService(service)}
                              className="bg-[#00C3FF] flex items-center gap-2 font-[600] p-2 px-4 rounded-full text-white cursor-pointer"
                            >
                              Add <FaPlus />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-2 border-gray-300">
        <button
          onClick={onNext}
          className={`w-full rounded-full text-white px-4 py-2 font-bold ${
            isServiceSelected
              ? "bg-[#FFD03E]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!isServiceSelected}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1;
