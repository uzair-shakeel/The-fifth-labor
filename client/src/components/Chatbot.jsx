import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";

const ChatbotIcon = ({ onClick }) => {
  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={onClick}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        <FaRobot size={24} />
      </button>
    </div>
  );
};

export default ChatbotIcon;
