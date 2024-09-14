import React from "react";
import "./styles/data-table.css";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/BaseURL";
import deleteData from "../hooks/useDelete";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const Blog = () => {
  const { data: blogs, loading, error } = useFetch(`${BASE_URL}/blogs`);

  return (
    <>
      <div className="data-box container-fluid pt-4">
        <div className="row align-item-center justify-content-center">
          <h1 className="dashboard-heading">Blogs</h1>
          <div className="d-flex align-item-center justify-content-between pt-5 mt-3 mb-1">
            <h5 className="dashboard-text">All Blogs</h5>
            <Link
              className="add-tour-btn btn btn-light text-white font-bold"
              to="/createblog"
            >
              <i className="ri-file-add-line text-white"></i> Create Blog
            </Link>
          </div>
          <div className="col-12 table-box">
            <table className="table tours-table shadow">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    #
                  </th>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Content</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="tecenter">
                {loading && (
                  <tr>
                    <td colSpan={6}>Loading...</td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={6}>{error}</td>
                  </tr>
                )}
                {!loading &&
                  !error &&
                  blogs?.map((item, index) => (
                    <tr key={item._id}>
                      <th scope="row" className="text-center">
                        {index + 1}
                      </th>
                      <AllBlogData item={item} />
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;

export const AllBlogData = ({ item }) => {
  const { _id, title, author, content, imageUrl } = item;

  const handleDelete = (id) => {
    deleteData(`${BASE_URL}/blogs/${id}`);
  };

  return (
    <>
      <td>
        <img
          className="img-fluid rounded-2 blog-item-img"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
          src={imageUrl}
          alt={title}
        />
      </td>
      <td className="text-wrap font-[600]">{title}</td>
      <td className="text-wrap">{author}</td>
      <td className="text-wrap">{content.substring(0, 100)}...</td>
      <td className="text-center">
        <Link
          className="btn btn-light text-white action-btn"
          to={`/updateblog/${_id}`}
        >
          <FaEdit size={20} />
        </Link>
        &nbsp; / &nbsp;
        <button
          className="btn btn-light action-btn text-white"
          type="button"
          onClick={() => handleDelete(_id)}
        >
          <FaTrash size={16} />
        </button>
      </td>
    </>
  );
};
