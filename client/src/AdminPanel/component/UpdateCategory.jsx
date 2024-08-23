import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/BaseURL";
import "./create-service.css"; // Reuse the same CSS file

const UpdateCategory = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Get category ID from URL

  useEffect(() => {
    // Fetch the existing category details on component mount
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories/${id}`);
        const data = await response.json();
        setCategoryData({
          name: data.name,
          description: data.description,
        });
      } catch (error) {
        toast.error("Failed to fetch category details.");
        console.error(error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!categoryData.name || !categoryData.description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const response = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message);
        return;
      }

      toast.success("Category updated successfully.");
      navigate("/categories");
    } catch (err) {
      toast.error("Error updating category.");
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
              Update Category
            </h1>

            <form onSubmit={handleUpdateCategory}>
              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Category Name:</span>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name of the category"
                  value={categoryData.name}
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
                  value={categoryData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="justify-content-end d-flex">
                <button
                  type="submit"
                  className="btn btn-light create-service-btn mb-3"
                >
                  <i className="ri-edit-line"></i> Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
