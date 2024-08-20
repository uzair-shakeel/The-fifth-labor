import React, { useState } from "react";
import "./create-service.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/BaseURL";

const CreateService = () => {
  const [serviceData, setServiceData] = useState({
    name: "",
    price: 0,
    image: null, // Image file
    description: "",
    duration: 0,
    subservices: [], // Array to hold subservices
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubserviceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSubservices = [...serviceData.subservices];
    updatedSubservices[index] = { ...updatedSubservices[index], [name]: value };
    setServiceData((prev) => ({
      ...prev,
      subservices: updatedSubservices,
    }));
  };

  const handleAddSubservice = () => {
    setServiceData((prev) => ({
      ...prev,
      subservices: [
        ...prev.subservices,
        { name: "", description: "", price: 0 }, // Initial values for new subservice
      ],
    }));
  };

  const handleRemoveSubservice = (index) => {
    const updatedSubservices = serviceData.subservices.filter(
      (_, i) => i !== index
    );
    setServiceData((prev) => ({
      ...prev,
      subservices: updatedSubservices,
    }));
  };

  const handleCreateService = async (e) => {
    e.preventDefault();

    if (
      !serviceData.name ||
      !serviceData.price ||
      !serviceData.description ||
      !serviceData.duration ||
      !serviceData.image
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const formData = new FormData();
      formData.append("name", serviceData.name);
      formData.append("price", serviceData.price);
      formData.append("description", serviceData.description);
      formData.append("duration", serviceData.duration);
      formData.append("image", serviceData.image); // Include image file
      formData.append("subservices", JSON.stringify(serviceData.subservices)); // Convert subservices array to JSON

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
    <>
      <div className="d-flex w-100 align-items-center justify-content-center ">
        <div className="container">
          <div className="row">
            <div className="col-12 shadow-lg rounded-2">
              <h1 className="text-center mb-5 mt-3">Create A New Service</h1>

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
                  <span className="input-group-text">Duration:</span>
                  <input
                    type="number"
                    name="duration"
                    className="form-control"
                    placeholder="Duration in minutes"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupFile01"
                  >
                    Service Pic
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="inputGroupFile01"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) =>
                      setServiceData({
                        ...serviceData,
                        image: e.target.files[0],
                      })
                    }
                  />
                </div>

                <div>
                  <h5>Subservices</h5>
                  {serviceData.subservices.map((subservice, index) => (
                    <div key={index} className="subservice-fields mb-3">
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          Subservice Name:
                        </span>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Subservice name"
                          value={subservice.name}
                          onChange={(e) => handleSubserviceChange(index, e)}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          Subservice Description:
                        </span>
                        <textarea
                          rows="2"
                          name="description"
                          className="form-control"
                          placeholder="Subservice description"
                          value={subservice.description}
                          onChange={(e) => handleSubserviceChange(index, e)}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          Subservice Price:
                        </span>
                        <input
                          type="number"
                          name="price"
                          className="form-control"
                          placeholder="Subservice price"
                          value={subservice.price}
                          onChange={(e) => handleSubserviceChange(index, e)}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-danger mb-2"
                        onClick={() => handleRemoveSubservice(index)}
                      >
                        Remove Subservice
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={handleAddSubservice}
                  >
                    Add a Subservice
                  </button>
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
    </>
  );
};

export default CreateService;
