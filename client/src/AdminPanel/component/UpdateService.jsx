import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/BaseURL";
import useFetch from "../../hooks/useFetch";

const UpdateService = () => {
  const { id } = useParams();
  const {
    data: service,
    loading: serviceLoading,
    error: serviceError,
  } = useFetch(`${BASE_URL}/services/${id}`);

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(`${BASE_URL}/categories`);

  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    category: "",
    subCategory: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (service) {
      setServiceData({
        name: service.name || "",
        description: service.description || "",
        price: service.price || 0,
        discountedPrice: service.discountedPrice || 0,
        category: service.category || "",
        subCategory: service.subCategory || "",
      });
      setImageUrl(service.imageUrl || "");
    }
  }, [service]);

  const handleChange = (e) => {
    setServiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        throw new Error("Token not found");
      }

      const formData = new FormData();
      formData.append("name", serviceData.name);
      formData.append("description", serviceData.description);
      formData.append("price", serviceData.price);
      formData.append("discountedPrice", serviceData.discountedPrice);
      formData.append("category", serviceData.category);
      formData.append("subCategory", serviceData.subCategory);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${BASE_URL}/services/${id}`, {
        method: "PUT",
        headers: headers,
        body: formData,
      });

      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message);
        return;
      }

      toast.success("Successfully Updated The Service.");
    } catch (err) {
      toast.error("Error updating service.");
      console.error(err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="d-flex w-100 align-items-center justify-content-center ">
      <div className="container">
        <div className="row">
          <div className="col-12 shadow-lg rounded-2">
            <form>
              <h1 className="text-center mb-5 mt-3 font-semibold text-2xl">
                Update The Service
              </h1>
              {/* Image Upload Section */}
              <div className="flex items-center justify-center input-fields mb-3">
                <div className="mb-3 h-[150px] w-[200px] shadow-md overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Service"
                    className="w-full h-full object-cover cursor-pointer rounded-lg"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  />
                </div>
                <input
                  type="file"
                  id="imageUpload"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              {/* Service Details Section */}
              <div className="input-fields input-group mb-3 d-flex flex-column flex-sm-row gap-3 gap-md-0">
                <div className="d-flex flex-grow-1">
                  <span className="input-group-text">Service name:</span>
                  <input
                    type="text"
                    name="name"
                    value={serviceData.name}
                    className="form-control"
                    placeholder="Name of the service"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Description:</span>
                <textarea
                  rows="5"
                  name="description"
                  value={serviceData.description}
                  className="form-control"
                  placeholder="Description of the service"
                  onChange={handleChange}
                />
              </div>

              <div className="input-fields input-group mb-3 d-flex flex-column flex-sm-row gap-3 gap-md-0">
                <div className="d-flex flex-grow-1">
                  <span className="input-group-text">Price:</span>
                  <input
                    type="number"
                    name="price"
                    value={serviceData.price}
                    className="form-control"
                    placeholder="Price of the service"
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-grow-1">
                  <span className="input-group-text">Discounted Price:</span>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={serviceData.discountedPrice}
                    className="form-control"
                    placeholder="Discounted Price of the service"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Category:</span>
                <select
                  name="category"
                  value={serviceData.category}
                  className="form-control"
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Subcategory:</span>
                <input
                  type="text"
                  name="subCategory"
                  value={serviceData.subCategory}
                  className="form-control"
                  placeholder="Subcategory of the service"
                  onChange={handleChange}
                />
              </div>

              <div className="justify-content-end d-flex">
                <button
                  type="submit"
                  onClick={handleUpdateService}
                  className="btn btn-light create-service-btn mb-3"
                >
                  <i className="ri-file-add-line"></i> Update Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateService;
