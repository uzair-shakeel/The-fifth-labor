import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const Step3 = ({ onNext, onDataChange, serviceType }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);
  const [selectedProfessionals, setSelectedProfessionals] = useState(null);
  const [selectedMaterials, setSelectedMaterials] = useState(null);

  const [dates, setDates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const generateDates = () => {
      const tempDates = [];
      for (let i = 1; i <= 15; i++) {
        const date = dayjs().add(i, "day");
        tempDates.push({
          day: date.format("ddd"),
          date: date.format("YYYY-MM-DD"),
        });
      }
      setDates(tempDates);
    };

    generateDates();
  }, []);

  useEffect(() => {
    const generateTimeSlots = () => {
      const slots = [];
      for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, "0");
        slots.push(`${hour}:00-${hour}:30`);
        slots.push(`${hour}:30-${(i + 1).toString().padStart(2, "0")}:00`);
      }
      setTimeSlots(slots);
    };

    generateTimeSlots();
  }, []);

  useEffect(() => {
    // Notify the parent component whenever the selections change
    if (selectedDate && selectedTime) {
      onDataChange({
        date: selectedDate,
        time: selectedTime,
        hours: selectedHours,
        professional: selectedProfessionals,
        cleaningMaterial: selectedMaterials,
      });
    }
    if (selectedHours && serviceType === "Home Cleaning") {
      onDataChange({ hours: selectedHours });
    }
    if (selectedProfessionals && serviceType === "Home Cleaning") {
      onDataChange({ professionals: selectedProfessionals });
    }
    if (selectedMaterials !== null && serviceType === "Home Cleaning") {
      onDataChange({ materials: selectedMaterials });
    }
  }, [
    selectedDate,
    selectedTime,
    selectedHours,
    selectedProfessionals,
    selectedMaterials,
    serviceType,
    onDataChange,
  ]);

  const isFormComplete =
    serviceType === "Home Cleaning"
      ? selectedDate &&
        selectedTime &&
        selectedHours &&
        selectedProfessionals &&
        selectedMaterials !== null
      : selectedDate && selectedTime;

  return (
    <div className="relative w-full max-w-screen-lg bg-white mx-auto">
      {/* Scrollable content */}
      <div
        className="overflow-y-auto no-scrollbar"
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        <div className="p-4">
          <p className="text-xl font-semibold mb-4">
            When would you like your service?
          </p>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {dates.map((dateObj, index) => (
              <div className="flex flex-col items-center" key={index}>
                <span>{dateObj.day}</span>
                <div
                  onClick={() => setSelectedDate(dateObj.date)}
                  className={`flex flex-col items-center justify-center p-2 rounded-full cursor-pointer border-2 w-12 ${
                    selectedDate === dateObj.date
                      ? "bg-blue-500 text-white border-blue-500"
                      : "text-gray-700 border-gray-300"
                  }`}
                >
                  <span className="font-semibold">
                    {dateObj.date.split("-")[2]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xl font-semibold mt-8 mb-4">
            What time would you like us to start?
          </p>
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap no-scrollbar">
            {timeSlots.map((timeSlot, index) => (
              <div
                key={index}
                onClick={() => setSelectedTime(timeSlot)}
                className={`flex items-center justify-center py-2 px-4 rounded-full cursor-pointer border-2 ${
                  selectedTime === timeSlot
                    ? "bg-blue-500 text-white border-blue-500"
                    : "text-gray-700 border-gray-300"
                }`}
              >
                <span className="font-semibold">{timeSlot}</span>
              </div>
            ))}
          </div>

          {serviceType === "Home Cleaning" && (
            <>
              <p className="text-xl font-semibold mt-8 mb-4">
                How many hours do you need your professional to stay?
              </p>
              <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap no-scrollbar">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((hours, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedHours(hours)}
                    className={`flex items-center justify-center py-2 px-4 rounded-full cursor-pointer border-2 ${
                      selectedHours === hours
                        ? "bg-blue-500 text-white border-blue-500"
                        : "text-gray-700 border-gray-300"
                    }`}
                  >
                    <span className="font-semibold">{hours}</span>
                  </div>
                ))}
              </div>

              <p className="text-xl font-semibold mt-8 mb-4">
                How many professionals do you need?
              </p>
              <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap no-scrollbar">
                {[1, 2, 3, 4].map((professionals, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedProfessionals(professionals)}
                    className={`flex items-center justify-center py-2 px-4 rounded-full cursor-pointer border-2 ${
                      selectedProfessionals === professionals
                        ? "bg-blue-500 text-white border-blue-500"
                        : "text-gray-700 border-gray-300"
                    }`}
                  >
                    <span className="font-semibold">{professionals}</span>
                  </div>
                ))}
              </div>

              <p className="text-xl font-semibold mt-8 mb-4">
                Need cleaning materials?
              </p>
              <div className="flex items-center gap-3">
                {["Yes", "No"].map((option, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedMaterials(option === "Yes")}
                    className={`flex items-center justify-center py-2 px-4 rounded-full cursor-pointer border-2 ${
                      selectedMaterials === (option === "Yes")
                        ? "bg-blue-500 text-white border-blue-500"
                        : "text-gray-700 border-gray-300"
                    }`}
                  >
                    <span className="font-semibold">{option}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-8">
            <p className="text-xl font-semibold mb-4">
              Any instructions or special requirements?
            </p>
            <textarea
              className="border border-gray-300 rounded px-4 py-2 w-full h-32"
              placeholder="Example: Stain on mattress, Sensitivity to certain chemicals, Material needs extra care, there is a baby or pet in the house, etc."
            />
          </div>
        </div>
      </div>

      {/* Fixed navigation button */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-2 border-gray-300">
        <button
          onClick={onNext}
          className={`w-full rounded-full text-white px-4 py-2 font-bold ${
            isFormComplete ? "bg-[#FFD03E]" : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!isFormComplete}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
