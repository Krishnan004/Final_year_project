import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/GreenBin_logo_transparent-removebg-preview.png';
import "../css/header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="GreenBin Logo" />
      </div>
      <div className="navigator">
        <Link to="/">Home</Link>

        {/* Service Dropdown */}
        <div className="dropdown">
          <Link to="/service">Service</Link>
          <div className="service_opt">
            <nav>
              <Link to="/mobileselling">Mobile selling</Link>
            </nav>
            <nav>
              <Link to="/trash">Trash</Link>
            </nav>
            <nav>
              <Link to="/knowprice">Know the Price</Link>
            </nav>
          </div>
        </div>

        <Link to="/view">About</Link>
        <Link to="/help">Help</Link>

        {/* Login Button */}
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </div>
  );
};

export default Header;
