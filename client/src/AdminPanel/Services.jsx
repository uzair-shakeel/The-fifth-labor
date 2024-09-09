import React, { useState } from "react";
import "./styles/data-table.css";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/BaseURL";
import calculateAvgRating from "../utils/avgRating";
import deleteData from "../hooks/useDelete";
import { Link } from "react-router-dom";
// import Spinner from "../component/Spinner";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const Menu = () => {
  const { data: services, loading, error } = useFetch(`${BASE_URL}/services`);
  console.log("hihiihi", services);

  return (
    <>
      <div className="data-box container-fluid pt-4">
        <div className="row align-item-center justify-content-center">
          <h1 className="dashboard-heading">Services</h1>
          <div className="d-flex align-item-center justify-content-between pt-5 mt-3 mb-1">
            <h5 className="dashboard-text">All Services</h5>
            <Link
              className="add-tour-btn btn btn-light text-white font-bold"
              to="/createservice"
            >
              <i className="ri-file-add-line text-white"></i> Create Service
            </Link>
          </div>
          <div className="col-12 table-box ">
            <table className="table tours-table shadow">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    #
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Name</th>
                  <th scope="col">Reviews</th>
                  <th scope="col">Sub Category</th>
                  <th scope="col">Discounted Price</th>
                  <th scope="col">Price</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="tecenter">
                {loading && (
                  <tr>
                    <td colSpan={7}>{/* <Spinner /> */}</td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={7}>{error}</td>
                  </tr>
                )}
                {!loading &&
                  !error &&
                  services?.map((item, index) => (
                    <tr key={item._id}>
                      <th scope="row" className="text-center">
                        {index + 1}
                      </th>
                      <AllMenuData item={item} />
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

export default Menu;

export const AllMenuData = ({ item }) => {
  const { _id, name, imageUrl, price, discountedPrice, subCategory, reviews } =
    item;

  const handleDelete = (id) => {
    deleteData(`${BASE_URL}/services/${id}`);
  };

  const { totalRating, avgRating } = calculateAvgRating();

  return (
    <>
      <td>
        <img
          className="img-fluid rounded-2 menu-item-img min-w-[100px]"
          src={imageUrl}
        />
      </td>
      <td className="text-wrap font-[600]">{name}</td>
      <td className="text-wrap font-[600]">{reviews?.length}</td>
      <td className="text-wrap">{subCategory}</td>
      <td>AED {discountedPrice}.00</td>
      <td>AED {price}.00</td>
      <td className="text-center">
        <Link
          className="btn btn-light text-white action-btn"
          to={`/updateservice/${_id}`}
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
