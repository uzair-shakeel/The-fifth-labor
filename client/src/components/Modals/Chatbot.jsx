import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const ChatbotModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 float-right"
        >
          <RxCross2 size={25} />{" "}
        </button>
        {submitted ? (
          <div>
            <h3 className="text-xl font-semibold">Thank you!</h3>
            <p>We'll contact you within 12 hours at {email}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                className="w-full p-2 border rounded-lg"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded-lg"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatbotModal;
