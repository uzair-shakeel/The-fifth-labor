import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/BaseURL";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./styles/data-table.css";

const TimeSlots = () => {
  const {
    data: timeSlotsData,
    loading,
    error,
  } = useFetch(`${BASE_URL}/time/time-management`);
  const [updating, setUpdating] = useState(false); // To handle button state while updating

  const handleUpdate = async (updatedSlot) => {
    setUpdating(true); // Disable buttons during the update
    try {
      const res = await fetch(`${BASE_URL}/time/time-management`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updatedSlots: [updatedSlot], // API expects an array of updated slots
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update the timeslot");
      }

      // Optional: Update the frontend state without reloading the page
      window.location.reload(); // Refreshes data after successful update
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false); // Re-enable buttons after update is complete
    }
  };

  return (
    <>
      <div className="data-box container-fluid pt-4">
        <div className="row align-item-center justify-content-center">
          <h1 className="dashboard-heading">Time Slots</h1>
          <div className="col-12 table-box">
            <table className="table shadow">
              <thead>
                <tr>
                  <th scope="col">Time Range</th>
                  <th scope="col">Is Peak</th>
                  <th scope="col">Is Working Hour</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={3}>Loading...</td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={3}>{error}</td>
                  </tr>
                )}
                {!loading &&
                  !error &&
                  timeSlotsData?.timeSlots?.map((slot) => (
                    <tr key={slot._id}>
                      <td>{slot.timeRange}</td>

                      {/* Is Peak Column with Action */}
                      <td>
                        {slot.isPeak ? "Yes" : "No"} &nbsp;
                        <button
                          className="btn btn-light text-white action-btn"
                          onClick={() =>
                            handleUpdate({
                              timeRange: slot.timeRange,
                              isPeak: !slot.isPeak, // Toggle Peak
                            })
                          }
                          disabled={updating}
                        >
                          {slot.isPeak ? (
                            <FaTimes size={16} title="Disable Peak" />
                          ) : (
                            <FaCheck size={16} title="Enable Peak" />
                          )}
                        </button>
                      </td>

                      {/* Is Working Hour Column with Action */}
                      <td>
                        {slot.isWorkingHour ? "Yes" : "No"} &nbsp;
                        <button
                          className="btn btn-light text-white action-btn"
                          onClick={() =>
                            handleUpdate({
                              timeRange: slot.timeRange,
                              isWorkingHour: !slot.isWorkingHour, // Toggle Working Hour
                            })
                          }
                          disabled={updating}
                        >
                          {slot.isWorkingHour ? (
                            <FaTimes size={16} title="Disable Working Hour" />
                          ) : (
                            <FaCheck size={16} title="Enable Working Hour" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeSlots;
