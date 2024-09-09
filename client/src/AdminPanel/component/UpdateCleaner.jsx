import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/BaseURL";
import "./create-service.css"; // Reuse the same CSS file

const UpdateCleaner = () => {
  const [cleanerData, setCleanerData] = useState({
    name: "",
    experience: "",
    age: "",
    image: null, // New image file
    isAvailable: "false", // String to match select value
  });

  const [existingImage, setExistingImage] = useState(null); // Existing image URL
  const imageInputRef = useRef(null); // Reference to the hidden file input
  const navigate = useNavigate();
  const { id } = useParams(); // Get cleaner ID from URL

  useEffect(() => {
    // Fetch the existing cleaner details on component mount
    const fetchCleaner = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cleaners/${id}`);
        const data = await response.json();
        setCleanerData({
          name: data.name,
          experience: data.experience,
          age: data.age,
          image: null, // Initialize with null for new image file
          isAvailable: data.isAvailable ? "true" : "false", // Set as string for select
        });
        setExistingImage(data.image); // Set the existing image URL
      } catch (error) {
        toast.error("Failed to fetch cleaner details.");
        console.error(error);
      }
    };

    fetchCleaner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCleanerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCleanerData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setExistingImage(reader.result); // Update preview to new image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    imageInputRef.current.click(); // Open file input dialog when image is clicked
  };

  const handleUpdateCleaner = async (e) => {
    e.preventDefault();

    if (!cleanerData.name || !cleanerData.experience || !cleanerData.age) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const formData = new FormData();
      formData.append("name", cleanerData.name);
      formData.append("experience", cleanerData.experience);
      formData.append("age", cleanerData.age);
      formData.append("isAvailable", cleanerData.isAvailable === "true"); // Convert to boolean
      if (cleanerData.image) {
        formData.append("image", cleanerData.image); // Append new image if selected
      }

      const response = await fetch(`${BASE_URL}/cleaners/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Use FormData for the request body
      });

      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message || "Error updating cleaner.");
        return;
      }

      toast.success("Cleaner updated successfully.");
      navigate("/cleaners");
    } catch (err) {
      toast.error("Error updating cleaner.");
      console.error(err);
    }
  };

  return (
    <div
      className="d-flex w-100 align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 shadow-lg rounded-2">
            <h1 className="text-center mb-5 mt-3 font-semibold text-2xl">
              Update Cleaner
            </h1>

            {/* Display Existing Image */}
            {existingImage && (
              <div className="text-center mb-4 flex items-center justify-center w-full">
                <img
                  src={existingImage}
                  alt="Cleaner"
                  className="img-thumbnail"
                  style={{ maxHeight: "200px", cursor: "pointer" }}
                  onClick={handleImageClick}
                />
              </div>
            )}

            {/* Hidden File Input for Image Upload */}
            <input
              type="file"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
              accept="image/*"
            />

            <form onSubmit={handleUpdateCleaner}>
              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Cleaner Name:</span>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name of the Cleaner"
                  value={cleanerData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Experience (years):</span>
                <input
                  type="number"
                  name="experience"
                  className="form-control"
                  placeholder="Years of experience"
                  value={cleanerData.experience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Age:</span>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  placeholder="Age of the Cleaner"
                  value={cleanerData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Select for Availability */}
              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Availability:</span>
                <select
                  name="isAvailable"
                  className="form-control"
                  value={cleanerData.isAvailable}
                  onChange={handleChange}
                  required
                >
                  <option value="false">Archive</option>
                  <option value="true">Unarchive</option>
                </select>
              </div>

              <div className="justify-content-end d-flex">
                <button
                  type="submit"
                  className="btn btn-light create-service-btn mb-3"
                >
                  <i className="ri-edit-line"></i> Update Cleaner
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCleaner;
