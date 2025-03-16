import React from "react";
import "../../css/AboutInHome.css";

const AboutInHome = () => {
  return (
    <div className="about">
      <div className="service">
        <h1>Sell Your Old Mobile Phones Easily</h1>
        <p>
          Got an old mobile phone lying around? Green Bin provides a hassle-free
          way to sell your used smartphones at the best price. Give your old
          phone a second life while reducing e-waste.
        </p>
        <button>Our Services</button>
      </div>
      <div className="service">
        <h1>Eco-Friendly E-Waste Collection</h1>
        <p>
          Don't let e-waste harm the environment! We collect and responsibly
          handle electronic waste, ensuring proper disposal or refurbishment.
          Join us in making the planet greener.
        </p>
        <button>Our Services</button>
      </div>
    </div>
  );
};

export default AboutInHome;
