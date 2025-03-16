import React from "react";
import { FaRecycle, FaMobileAlt, FaTruck, FaLeaf } from "react-icons/fa";
import "./About.css"; // Import external CSS file

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h2 className="about-title">About Green Bin</h2>
          <p className="about-description">
            Green Bin is committed to reducing electronic waste by providing an 
            easy and responsible way to sell or recycle old mobile phones and 
            e-waste. Our mission is to create a <strong>greener future</strong> by 
            extending the life of used electronics and ensuring safe disposal.
          </p>
          <button className="learn-more-btn">Learn More</button>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <FaMobileAlt className="feature-icon" />
            <h3>Sell Your Old Phones</h3>
            <p>Get the best price for your used mobile phones. Hassle-free pickup available.</p>
          </div>
          <div className="feature-card">
            <FaRecycle className="feature-icon" />
            <h3>Secure E-Waste Disposal</h3>
            <p>We ensure safe and eco-friendly recycling of discarded electronics.</p>
          </div>
          <div className="feature-card">
            <FaTruck className="feature-icon" />
            <h3>Free Pickup Service</h3>
            <p>Schedule a pickup, and we'll collect your e-waste right from your doorstep.</p>
          </div>
          <div className="feature-card">
            <FaLeaf className="feature-icon" />
            <h3>Sustainability Matters</h3>
            <p>Join us in reducing e-waste and making a positive impact on the environment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
