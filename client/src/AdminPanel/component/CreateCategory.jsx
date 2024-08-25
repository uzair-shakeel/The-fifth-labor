import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/BaseURL";
import "./create-service.css"; // Reuse the same CSS file

const CreateCategory = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    image: null, // Add image to the state
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (
      !categoryData.name ||
      !categoryData.description ||
      !categoryData.image
    ) {
      toast.error("Please fill in all required fields, including the image.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const formData = new FormData();
      formData.append("name", categoryData.name);
      formData.append("description", categoryData.description);
      formData.append("image", categoryData.image); // Append image file

      const response = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Use FormData for the request body
      });

      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message);
        return;
      }

      toast.success("Category created successfully.");
      navigate("/categories");
    } catch (err) {
      toast.error("Error creating category.");
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
              Create A New Category
            </h1>

            <form onSubmit={handleCreateCategory}>
              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Category Name:</span>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name of the category"
                  onChange={handleChange}
                />
              </div>

              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Description:</span>
                <textarea
                  rows="5"
                  name="description"
                  className="form-control"
                  placeholder="Description of the category"
                  onChange={handleChange}
                />
              </div>

              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Upload Image:</span>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*" // Restrict to image files
                />
              </div>

              <div className="justify-content-end d-flex">
                <button
                  type="submit"
                  className="btn btn-light create-service-btn mb-3"
                >
                  <i className="ri-file-add-line"></i> Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
