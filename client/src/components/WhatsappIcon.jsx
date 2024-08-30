import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon

const ChatbotIcon = () => {
  const handleClick = () => {
    // Replace with your WhatsApp phone number and optional pre-filled message
    const phoneNumber = "+9212345678"; // e.g., "+1234567890"
    const message = "Hello, I need more details!";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp URL in a new tab
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="fixed bottom-4 left-4">
      <button
        onClick={handleClick}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
  );
};

export default ChatbotIcon;
