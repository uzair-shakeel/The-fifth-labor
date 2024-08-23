import React from "react";
import "./styles/data-table.css";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/BaseURL";
import deleteData from "../hooks/useDelete";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const Categories = () => {
  const {
    data: categories,
    loading,
    error,
  } = useFetch(`${BASE_URL}/categories`);

  return (
    <>
      <div className="data-box container-fluid pt-4">
        <div className="row align-item-center justify-content-center">
          <h1 className="dashboard-heading">Categories</h1>
          <div className="d-flex align-item-center justify-content-between pt-5 mt-3 mb-1">
            <h5 className="dashboard-text">All Categories</h5>
            <Link
              className="add-tour-btn btn btn-light text-white font-bold"
              to="/createcategory"
            >
              <i className="ri-file-add-line text-white"></i> Create Category
            </Link>
          </div>
          <div className="col-12 table-box ">
            <table className="table tours-table shadow">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    #
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="tecenter">
                {loading && (
                  <tr>
                    <td colSpan={4}>Loading...</td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={4}>{error}</td>
                  </tr>
                )}
                {!loading &&
                  !error &&
                  categories?.map((category, index) => (
                    <tr key={category._id}>
                      <th scope="row" className="text-center">
                        {index + 1}
                      </th>
                      <AllCategoriesData category={category} />
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

export default Categories;

export const AllCategoriesData = ({ category }) => {
  const { _id, name, description } = category;

  const handleDelete = (id) => {
    deleteData(`${BASE_URL}/categories/${id}`);
  };

  return (
    <>
      <td className="text-wrap font-[600]">{name}</td>
      <td className="text-wrap">{description}</td>
      <td className="text-center">
        <Link
          className="btn btn-light text-white action-btn"
          to={`/updatecategory/${_id}`}
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
