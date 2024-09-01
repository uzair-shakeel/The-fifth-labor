import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/BaseURL";
import "./create-service.css"; // Reuse the same CSS file

const CreateCleaner = () => {
  const [cleanerData, setCleanerData] = useState({
    name: "",
    experience: "",
    age: "",
    image: null, // Initialize image to null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCleanerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCleanerData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleCreateCleaner = async (e) => {
    e.preventDefault();

    // Validation to ensure all fields are filled in
    if (
      !cleanerData.name ||
      !cleanerData.experience ||
      !cleanerData.age ||
      !cleanerData.image
    ) {
      toast.error("Please fill in all required fields, including the image.");
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
      formData.append("image", cleanerData.image); // Append image file

      const response = await fetch(`${BASE_URL}/cleaners`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Use FormData for the request body
      });

      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message || "Error creating cleaner.");
        return;
      }

      toast.success("Cleaner created successfully.");
      navigate("/cleaners"); // Navigate to the cleaners list page
    } catch (err) {
      toast.error("Error creating cleaner.");
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
              Add A New Cleaner
            </h1>

            <form onSubmit={handleCreateCleaner}>
              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Cleaner Name:</span>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name of the Cleaner"
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
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Upload Image:</span>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                />
              </div>

              <div className="justify-content-end d-flex">
                <button
                  type="submit"
                  className="btn btn-light create-service-btn mb-3"
                >
                  <i className="ri-file-add-line"></i> Create Cleaner
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCleaner;
