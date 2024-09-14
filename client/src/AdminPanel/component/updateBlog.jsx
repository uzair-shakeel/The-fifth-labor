import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/BaseURL";
import useFetch from "../../hooks/useFetch";

const UpdateBlog = () => {
  const { id } = useParams();
  const {
    data: blog,
    loading: blogLoading,
    error: blogError,
  } = useFetch(`${BASE_URL}/blogs/${id}`);

  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    content: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (blog) {
      setBlogData({
        title: blog.title || "",
        author: blog.author || "",
        content: blog.content || "",
      });
      setImageUrl(blog.imageUrl || "");
    }
  }, [blog]);

  const handleChange = (e) => {
    setBlogData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        throw new Error("Token not found");
      }

      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("author", blogData.author);
      formData.append("content", blogData.content);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: "PUT",
        headers: headers,
        body: formData,
      });

      const { message } = await response.json();

      if (!response.ok) {
        toast.error(message);
        return;
      }

      toast.success("Blog updated successfully.");
      navigate("/blogs");
    } catch (err) {
      toast.error("Error updating blog.");
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
                Update Blog
              </h1>
              {/* Image Upload Section */}
              <div className="flex items-center justify-center input-fields mb-3">
                <div className="mb-3 h-[150px] w-[200px] shadow-md overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Blog"
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

              {/* Blog Details Section */}
              <div className="input-fields input-group mb-3 d-flex flex-column flex-sm-row gap-3 gap-md-0">
                <div className="d-flex flex-grow-1">
                  <span className="input-group-text">Blog Title:</span>
                  <input
                    type="text"
                    name="title"
                    value={blogData.title}
                    className="form-control"
                    placeholder="Title of the blog"
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
                    value={blogData.author}
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
                  value={blogData.content}
                  className="form-control"
                  placeholder="Content of the blog"
                  onChange={handleChange}
                />
              </div>

              <div className="justify-content-end d-flex">
                <button
                  type="submit"
                  onClick={handleUpdateBlog}
                  className="btn btn-light create-service-btn mb-3"
                >
                  <i className="ri-file-add-line"></i> Update Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
