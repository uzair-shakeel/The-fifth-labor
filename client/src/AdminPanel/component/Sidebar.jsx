import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import weblogo from "../../../public/whiteLogo.png";
import Avatar from "../../../public/avatar.jpg";
import { toast } from "react-hot-toast";
import "./sidebar.css";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Logout Successfully!");
  };

  return (
    <>
      <div
        className={`${
          isCollapsed
            ? "d-block sidebar-collapse-behind-space"
            : "sidebar-behind-space d-block"
        }`}
      ></div>
      <div
        className={`d-flex sidebar-wrapper flex-column text-bg-dark align-items-between h-100 sidebar wrapper ${
          isCollapsed ? "collapsed-sidebar p-1" : "p-3"
        }`}
        style={{ zIndex: 10 }}
      >
        <button
          className="btn text-white collapse-btn align-item-center justify-content-center ms-1 my-auto"
          onClick={handleToggleCollapse}
          style={{ maxWidth: "70px" }}
        >
          <i className={`ri-menu-${isCollapsed ? "unfold" : "fold"}-line`}></i>
        </button>
        <div className="navigation-section">
          <Link
            to="/"
            className={`navbar-brand logo d-flex ${
              isCollapsed ? "collapsed-sidebar" : ""
            }`}
          >
            <img
              className={`logo img-fluid rounded-2 ${
                isCollapsed ? "d-none" : "d-block"
              }`}
              src={weblogo}
              alt="Website Logo"
            />
          </Link>
          <hr />
          <ul
            className={`nav nav-pills shadow flex-column mb-auto ${
              isCollapsed ? "collapsed-sidebar" : ""
            }`}
          >
            <li className="nav-item admin-nav-items">
              <Link
                to="/dashboard"
                className="nav-link sidebar-link text-white"
                aria-current="page"
              >
                <i
                  className={`ri-dashboard-line ${isCollapsed ? "" : "pe-2"}`}
                ></i>
                {isCollapsed ? "" : "Dashboard"}
              </Link>
            </li>
            <li className="nav-item admin-nav-items">
              <Link to="/menu" className="nav-link sidebar-link text-white">
                <i
                  className={`ri-restaurant-line ${isCollapsed ? "" : "pe-2"}`}
                ></i>
                {isCollapsed ? "" : "Services"}
              </Link>
            </li>
            <li className="nav-item admin-nav-items">
              <Link to="/orders" className="nav-link sidebar-link text-white">
                <i
                  className={`ri-calendar-2-fill ${isCollapsed ? "" : "pe-2"}`}
                ></i>
                {isCollapsed ? "" : "Bookings"}
              </Link>
            </li>
            <li className="nav-item admin-nav-items">
              <Link to="/users" className="nav-link sidebar-link text-white">
                <i className={`ri-group-line ${isCollapsed ? "" : "pe-2"}`}></i>
                {isCollapsed ? "" : "Users"}
              </Link>
            </li>
            <li className="nav-item admin-nav-items">
              <Link to="/messages" className="nav-link sidebar-link text-white">
                <i
                  className={`ri-chat-2-line ${isCollapsed ? "" : "pe-2"}`}
                ></i>
                {isCollapsed ? "" : "Messages"}
              </Link>
            </li>
            {/* <li className="nav-item admin-nav-items">
              <Link
                to="/feedbacks"
                className="nav-link sidebar-link text-white"
              >
                <i
                  className={`ri-feedback-line ${isCollapsed ? "" : "pe-2"}`}
                ></i>
                {isCollapsed ? "" : "Feedbacks"}
              </Link>
            </li> */}
            <li className="nav-item admin-nav-items">
              <Link to="/admins" className="nav-link sidebar-link text-white">
                <i className={`ri-admin-line ${isCollapsed ? "" : "pe-2"}`}></i>
                {isCollapsed ? "" : "Admins"}
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={`profile-section mt-auto ${
            isCollapsed ? "collapsed-sidebar" : ""
          }`}
        >
          <div className="w-100">
            <hr />
            <div className="dropdown">
              <Link
                to="#"
                className={`d-flex align-items-center text-white text-decoration-none ${
                  isCollapsed ? "" : "dropdown-toggle"
                }`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={user?.photo || Avatar}
                  className="profileimg img-fluid rounded-circle border border-2 me-2 ms-2"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  alt="profile-img"
                />
                <strong className="ms-1">
                  {isCollapsed ? "" : user?.username}
                </strong>
              </Link>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to={`/my-account/${user?._id}`}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" onClick={logout}>
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
