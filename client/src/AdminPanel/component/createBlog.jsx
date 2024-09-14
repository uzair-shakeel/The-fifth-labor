import React, { useState } from "react";
import "./create-service.css"; // Assuming the same styling is used
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/BaseURL";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    content: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    if (
      !blogData.title ||
      !blogData.content ||
      !blogData.author ||
      !blogData.image
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("author", blogData.author);
      formData.append("content", blogData.content);
      formData.append("image", blogData.image);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${BASE_URL}/blogs`, {
        method: "POST",
        body: formData,
        headers: headers,
      });

      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message);
        return;
      }

      toast.success("Successfully created a new blog.");
      navigate("/blogs");
    } catch (err) {
      toast.error("Error creating blog.");
      console.error(err);
    }
  };

  return (
    <div className="d-flex w-100 min-h-screen align-items-center justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-12 shadow-lg rounded-2">
            <h1 className="text-center mb-5 mt-3 font-semibold text-2xl">
              Create A New Blog
            </h1>

            <form onSubmit={handleCreateBlog}>
              <div className="input-fields input-group mb-3 d-flex flex-column flex-sm-row gap-3 gap-md-0">
                <div className="d-flex flex-grow-1">
                  <span className="input-group-text">Title:</span>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Blog title"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-fields input-group mb-3 d-flex flex-column flex-sm-row gap-3 gap-md-0">
                <div className="d-flex flex-grow-1">
                  <span className="input-group-text">Author:</span>
                  <input
                    type="text"
                    name="author"
                    className="form-control"
                    placeholder="Author name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-fields input-group mb-3">
                <span className="input-group-text">Content:</span>
                <textarea
                  rows="5"
                  name="content"
                  className="form-control"
                  placeholder="Blog content"
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupFile01">
                  Blog Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  id="inputGroupFile01"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={(e) =>
                    setBlogData({
                      ...blogData,
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
                  <i className="ri-file-add-line"></i> Create Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
