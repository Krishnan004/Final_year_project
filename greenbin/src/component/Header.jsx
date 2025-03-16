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

        
          <Link to="/mobileselling">Mobile selling</Link>
          

        <Link to="/about">About</Link>
        {/* <Link to="/help">Help</Link> */}

        {/* Login Button */}
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </div>
  );
};

export default Header;
