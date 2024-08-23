import React from "react";
import { Dropdown, Space } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import logo from "../../public/NavbarLogo.jpg";
import { Link } from "react-router-dom";

const Navbar = ({ openLoginSignupModal, openLoginModal }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto py-2 px-2  flex justify-between items-center">
        {/* Logo */}
        <Link to={"/home"}>
          <img src={logo} className="h-14 w-auto bg-black" />
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
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        openLoginSignupModal();
                      }}
                    >
                      Signup
                    </a>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        openLoginModal();
                      }}
                    >
                      Login
                    </a>
                  ),
                },
                {
                  key: "3",
                  label: <Link to="/profile">Profile</Link>,
                },
                {
                  key: "4",
                  label: <Link to="/bookings">Bookings</Link>,
                },
              ],
            }}
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
