import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/BaseURL";
import toast from "react-hot-toast";
import ScaleLoader from "react-spinners/ScaleLoader";
import { RxCross2 } from "react-icons/rx";

const VerificationModal = ({ isOpen, onClose, openAddressModal }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30); // Initial countdown time
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    if (isOpen) {
      setResendTimer(30); // Reset the timer when the modal is opened
      setCode(["", "", "", ""]); // Clear the code when the modal is opened
    }
  }, [isOpen]);

  useEffect(() => {
    let timerId;
    if (resendTimer > 0 && isOpen) {
      timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timerId);
  }, [resendTimer, isOpen]);

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);

    if (value && index < 3) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleKeyPress = (index, event) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    } else if (event.key !== "Backspace" && index < 0) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const enteredCode = code.join("");
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/users/verify`, {
        email: email, // assuming phoneNumber is the email or you can use email directly
        verificationCode: enteredCode,
      });

      if (response.data.message === "User verified successfully") {
        toast.success(response.data.message);
        openAddressModal();
      } else {
        toast.error(response.data.message); // Show the message returned by the server
      }
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">Verify Email Address</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <RxCross2 size={25} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-2">
            Please enter the code that was sent to:
          </p>
          <p className="text-lg font-semibold mb-4">{email}</p>
          <div className="flex justify-center mb-6 space-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyPress(index, e)}
                maxLength={1}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                autoFocus={index === 0} // Auto focus the first input field
              />
            ))}
          </div>
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Resend code in{" "}
              <span className="font-semibold">
                {`00:${resendTimer < 10 ? `0${resendTimer}` : resendTimer}`}
              </span>
            </p>
            <div className="flex justify-center mt-2 space-x-3">
              <button
                className="px-4 py-2 text-sm bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
                disabled={resendTimer > 0} // Disable when countdown is running
              >
                Resend
              </button>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow-400 text-white rounded-lg py-2 font-semibold hover:bg-yellow-500 transition duration-200"
          >
            {!loading ? (
              "Verify Number"
            ) : (
              <ScaleLoader color={"#fff"} className="h-2 w-auto" height={12} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
