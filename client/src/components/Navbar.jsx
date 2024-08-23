import React, { useState, useEffect, useContext } from "react";
import { Dropdown, Space } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import logo from "../../public/NavbarLogo.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/auth-context";
import appStore from "../../public/appstore.png";
import playStore from "../../public/playstore.png";

const Navbar = ({ openLoginSignupModal, openLoginModal, handleLogout }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  const handleLogoutClick = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    toast.success("Logged Out Successfully");
    if (handleLogout) {
      handleLogout();
    }
  };

  const menuItems = isLoggedIn
    ? [
        {
          key: "1",
          label: (
            <Link to="/profile" className="dropdown-menu-item">
              Profile
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link to="/bookings" className="dropdown-menu-item">
              Bookings
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link to="/addresses" className="dropdown-menu-item">
              Addresses
            </Link>
          ),
        },
        {
          key: "4",
          label: (
            <div
              className="dropdown-menu-item"
              onClick={(e) => {
                e.preventDefault();
                handleLogoutClick();
              }}
            >
              Logout
            </div>
          ),
        },
        {
          key: "5",
          label: (
            <a href="#" className="dropdown-menu-item">
              <img src={appStore} alt="App Store" className="p-2" />
            </a>
          ),
        },
        {
          key: "6",
          label: (
            <a href="#" className="dropdown-menu-item">
              <img src={playStore} alt="Play Store" className="p-2" />
            </a>
          ),
        },
      ]
    : [
        {
          key: "1",
          label: (
            <div
              className="dropdown-menu-item"
              onClick={(e) => {
                e.preventDefault();
                openLoginSignupModal();
              }}
            >
              Signup
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              className="dropdown-menu-item"
              onClick={(e) => {
                e.preventDefault();
                openLoginModal();
              }}
            >
              Login
            </div>
          ),
        },
        {
          key: "3",
          label: (
            <a href="#" className="dropdown-menu-item">
              <img src={appStore} alt="App Store" />
            </a>
          ),
        },
        {
          key: "4",
          label: (
            <a href="#" className="dropdown-menu-item">
              <img src={playStore} alt="Play Store" />
            </a>
          ),
        },
      ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto py-2 px-2 flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"}>
          <img src={logo} className="h-14 w-auto bg-black" alt="Logo" />
        </Link>
        {/* Right side: Language, Country Flag, Profile, and Menu */}
        <div className="flex items-center space-x-4">
          <div className="text-sm">العربية</div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg"
            alt="UAE Flag"
            className="w-6 h-4"
          />
          <Dropdown
            overlayStyle={{ width: "200px" }} // Adjust the width here
            menu={{ items: menuItems }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <FaUserCircle size={23} />
                <IoMenu size={30} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
