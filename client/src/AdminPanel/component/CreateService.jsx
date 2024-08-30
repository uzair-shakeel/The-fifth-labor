import React, { useState, useEffect } from "react";
import "./create-service.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/BaseURL";

const CreateService = () => {
  const [serviceData, setServiceData] = useState({
    name: "",
    price: 0,
    discountedPrice: 0,
    image: null,
    description: "",
    category: "",
    subCategory: "",
  });

  const [categories, setCategories] = useState([]); // State to store categories

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories/categories`);
        const data = await response.json();
        console.log(data);
        setCategories(data);
      } catch (error) {
        toast.error("Failed to fetch categories.");
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateService = async (e) => {
    e.preventDefault();

    if (
      !serviceData.name ||
      !serviceData.description ||
      !serviceData.category ||
      !serviceData.image
    ) {
      toast.error("Please fill in all required fields.");
      console.log("object", serviceData.category);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const formData = new FormData();
      formData.append("name", serviceData.name);
      formData.append("price", serviceData?.price);
      formData.append("discountedPrice", serviceData.discountedPrice);
      formData.append("description", serviceData.description);
      formData.append("category", serviceData.category);
      formData.append("subCategory", serviceData.subCategory);
      formData.append("image", serviceData.image);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${BASE_URL}/services`, {
        method: "POST",
        body: formData,
        headers: headers,
      });

      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message);
        return;
      }

      toast.success("Successfully created a new service.");
      navigate("/services");
    } catch (err) {
      toast.error("Error creating service.");
      console.error(err);
    }
  };

  return (
    <div className="d-flex w-100 align-items-center justify-content-center ">
      <div className="container">
        <div className="row">
          <div className="col-12 shadow-lg rounded-2">
            <h1 className="text-center mb-5 mt-3 font-semibold text-2xl">
              Create A New Service
            </h1>

            <form onSubmit={handleCreateService}>
              <div className="input-fields input-group mb-3 d-flex flex-column flex-sm-row gap-3 gap-md-0">
                <div className="d-flex flex-grow-1">
                  <span className="input-group-text">Service name:</span>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name of the service"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Price:</span>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Price of the service"
                  onChange={handleChange}
                />
              </div>
              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Discounted Price:</span>
                <input
                  type="number"
                  name="discountedPrice"
                  className="form-control"
                  placeholder="Discounted price of the service"
                  onChange={handleChange}
                />
              </div>
              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Description:</span>
                <textarea
                  rows="5"
                  name="description"
                  className="form-control"
                  placeholder="Description of the service"
                  onChange={handleChange}
                />
              </div>
              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Category:</span>
                <select
                  name="category"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Sub-Category:</span>
                <input
                  type="text"
                  name="subCategory"
                  className="form-control"
                  placeholder="Service sub-category"
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupFile01">
                  Service Pic
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  id="inputGroupFile01"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={(e) =>
                    setServiceData({
                      ...serviceData,
                      image: e.target.files[0],
                    })
                  }
                />
              </div>

              <div className="justify-content-end d-flex">
                <button
                  type="submit"
                  className="btn btn-light create-service-btn mb-3"
                >
                  <i className="ri-file-add-line"></i> Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
