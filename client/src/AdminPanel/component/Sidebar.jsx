import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import weblogo from "../../../public/whiteLogo.png";
import Avatar from "../../../public/avatar.jpg";
import { toast } from "react-hot-toast";
import "./sidebar.css";
import { AuthContext } from "../../context/AuthContext";
import { MdDashboard } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { RiReservedFill, RiAdminFill } from "react-icons/ri";
import { FaUsers, FaExpandAlt } from "react-icons/fa";
import { BiSolidMessageSquareDetail, BiSolidCategory } from "react-icons/bi";
import { ImShrink2 } from "react-icons/im";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

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
    // dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
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
        className={`d-flex sidebar-wrapper flex-column text-bg-dark align-items-between h-[100px] sidebar wrapper ${
          isCollapsed ? "collapsed-sidebar p-1" : "p-3"
        }`}
        style={{ zIndex: 10 }}
      >
        <button
          className="btn text-white collapse-btn justify-center flex  align-item-center ms-1 my-auto"
          onClick={handleToggleCollapse}
          style={{ maxWidth: "70px" }}
        >
          {isCollapsed ? <FaExpandAlt size={25} /> : <ImShrink2 size={25} />}
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
                className="nav-link flex items-center gap-2 sidebar-link text-white"
                aria-current="page"
              >
                <MdDashboard size={25} />

                {isCollapsed ? "" : "Dashboard"}
              </Link>
            </li>
            <li className="nav-item admin-nav-items">
              <Link
                to="/categories"
                className="nav-link flex items-center gap-2 sidebar-link text-white"
              >
                <BiSolidCategory size={25} />

                {isCollapsed ? "" : "Categories"}
              </Link>
            </li>
            <li className="nav-item admin-nav-items">
              <Link
                to="/services"
                className="nav-link flex items-center gap-2 sidebar-link text-white"
              >
                <GrServices size={25} />

                {isCollapsed ? "" : "Services"}
              </Link>
            </li>
            <li className="nav-item admin-nav-items">
              <Link
                to="/bookings"
                className="nav-link flex items-center gap-2 sidebar-link text-white"
              >
                <RiReservedFill size={25} />
                {isCollapsed ? "" : "Bookings"}
              </Link>
            </li>
            <li className="nav-item admin-nav-items">
              <Link
                to="/users"
                className="nav-link flex items-center gap-2 sidebar-link text-white"
              >
                <FaUsers size={25} />
                {isCollapsed ? "" : "Users"}
              </Link>
            </li>
            <li className="nav-item  admin-nav-items">
              <Link
                to="/messages"
                className="nav-link flex items-center gap-2 sidebar-link text-white"
              >
                <BiSolidMessageSquareDetail size={25} />
                {isCollapsed ? "" : "Messages"}
              </Link>
            </li>

            <li className="nav-item admin-nav-items">
              <Link
                to="/admins"
                className="nav-link flex items-center gap-2 sidebar-link text-white"
              >
                <RiAdminFill size={25} />
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
