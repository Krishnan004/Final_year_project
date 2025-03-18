import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/GreenBin_logo_transparent-removebg-preview.png";
import "../css/header.css";

const Header = () => {
  return (
    <div className="header">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="GreenBin Logo" />
        </Link>
      </div>

      {/* Navigation */}
      <div className="navigator">
        <Link to="/">Home</Link>

        {/* Dropdown for mobile selling */}
        <div className="dropdown">
          <Link to="/mobileselling">Mobile Selling</Link>
          
        </div>

        <Link to="/about">About</Link>

        {/* Login Button */}
        <Link to="/login" className="login-button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
