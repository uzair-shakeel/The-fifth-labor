import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/BaseURL";
import useFetch from "../../hooks/useFetch";

const UpdateService = () => {
  const { id } = useParams();
  const {
    data: service,
    loading,
    error,
  } = useFetch(`${BASE_URL}/services/${id}`);

  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    price: 0,
    duration: 0,
    subservices: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (service) {
      setServiceData({
        name: service.name || "",
        description: service.description || "",
        price: service.price || 0,
        duration: service.duration || 0,
        subservices: service.subservices || [],
      });
      setImageUrl(service.imageUrl || ""); // Set the initial image URL
    }
  }, [service]);

  const handleChange = (e) => {
    setServiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubserviceChange = (index, field, value) => {
    const updatedSubservices = [...serviceData.subservices];
    updatedSubservices[index][field] = value;
    setServiceData((prev) => ({ ...prev, subservices: updatedSubservices }));
  };

  const handleAddSubservice = () => {
    setServiceData((prev) => ({
      ...prev,
      subservices: [
        ...prev.subservices,
        { name: "", description: "", price: 0 },
      ],
    }));
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
      formData.append("duration", serviceData.duration);
      formData.append("subservices", JSON.stringify(serviceData.subservices));

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
      setImageUrl(URL.createObjectURL(file)); // Show the new image preview
    }
  };

  return (
    <div className="d-flex w-100 align-items-center justify-content-center ">
      <div className="container">
        <div className="row">
          <div className="col-12 shadow-lg rounded-2">
            <form>
              <h1 className="text-center mb-5 mt-3">Update The Service</h1>
              {/* Image Upload Section */}
              <div className="flex items-center justify-center input-fields mb-3">
                <div className="mb-3 h-[150px] w-[200px] shadow-md overflow-hidden">
                  <img
                    src={imageUrl} // Always display the current image
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
                <div className="d-flex flex-grow-1">
                  <span className="input-group-text">Duration (minutes):</span>
                  <input
                    type="number"
                    name="duration"
                    value={serviceData.duration}
                    className="form-control"
                    placeholder="Duration of the service"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-fields input-group mb-3">
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

              {/* Subservices Section */}
              <div className="input-fields mb-3">
                <h5>Subservices:</h5>
                {serviceData.subservices.map((subservice, index) => (
                  <div key={index} className="mb-3">
                    <div className="input-group mb-2">
                      <span className="input-group-text">Name:</span>
                      <input
                        type="text"
                        value={subservice.name}
                        className="form-control"
                        placeholder={`Subservice ${index + 1} Name`}
                        onChange={(e) =>
                          handleSubserviceChange(index, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="input-group mb-2">
                      <span className="input-group-text">Description:</span>
                      <input
                        type="text"
                        value={subservice.description}
                        className="form-control"
                        placeholder={`Subservice ${index + 1} Description`}
                        onChange={(e) =>
                          handleSubserviceChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="input-group mb-2">
                      <span className="input-group-text">Price:</span>
                      <input
                        type="number"
                        value={subservice.price}
                        className="form-control"
                        placeholder={`Subservice ${index + 1} Price`}
                        onChange={(e) =>
                          handleSubserviceChange(index, "price", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSubservice}
                  className="btn btn-primary"
                >
                  Add Subservice
                </button>
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
