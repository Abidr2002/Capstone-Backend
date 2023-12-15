// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import NavButton from "../Elements/Navbutton";
import { Icon } from "@iconify/react";
import { useAuth } from "../hooks/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth, username, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleListClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white px-5 md:px-10 lg:px-20 py-16 md:py-7 item-center justify-between flex flex-col md:flex-row">
      <div className="flex justify-between">
        <img
          src="/images/fit-life-hub-high-resolution-logo-transparent.png"
          alt="fit-life-hub-logo"
          className="h-8"
        />
        <button onClick={handleListClick}>
          <Icon
            icon="ph:list"
            className="text-cyan-900 md:hidden"
            width={"30"}
            height={"30"}
          />
        </button>
      </div>
      <div
        className={`flex flex-col ${
          isOpen ? "" : "hidden md:flex"
        } md:flex-row md:space-x-10 pt-6 md:pt-0 font-medium text-lg md:text-lg`}
      >
        <NavButton to="/" label="Home" />
        <NavButton to="/articles" label="Articles" />
        <NavButton to="/calc-it" label="Calc It!" />
        <NavButton to="/about-us" label="About Us" />
        {auth ? (
          <>
            <p className="text-gray-400 py-4 md:py-0 border-b border-stone-400 md:border-0">
              Hello, {username}
            </p>
            <button
              className="text-gray-400 py-4 md:py-0 border-b border-stone-400 md:border-0"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <NavButton to="/login" label="Login" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
