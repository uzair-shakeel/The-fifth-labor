import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/BaseURL";
import "./BlogDetail.css";
import { FaArrowLeftLong } from "react-icons/fa6";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError("Failed to fetch blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();

    // Smooth scroll to the top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!blog) {
    return <p className="text-center">Blog not found.</p>;
  }

  return (
    <div className="p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className=" mb-3 flex gap-2 items-center  text-gray-800 "
        >
          <FaArrowLeftLong /> Go Back
        </button>
        <div className=" bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={blog.imageUrl || "https://via.placeholder.com/800x400"}
            alt={blog.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-600 mb-4">{`By ${blog.author} on ${new Date(
              blog.createdAt
            ).toLocaleDateString()}`}</p>
            <p className="text-gray-700 mb-6">{blog.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
