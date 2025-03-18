import React, { useContext } from "react";
import "../../css/mobile selling/ViewMobile.css";
import { Context } from "../../context/Context";
import { useParams, Link } from "react-router-dom";

const ViewMobile = () => {
  const { GetMobileById, setScreen } = useContext(Context);
  const params = useParams();

  // Get mobile details dynamically from URL params
  let mobile = GetMobileById(params.id);
  setScreen(1);

  // Handle case where mobile is not found
  if (!mobile) {
    return <h1 className="not-found">Mobile not found</h1>;
  }

  return (
    <div className="page-container">
      <div>
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> ›
          <Link to="/mobileselling"> Sell Old Mobile Phone</Link> ›
          <Link to={`/mobileselling/${mobile.id}`}>
            Sell Old {`${mobile.brand} ${mobile.model}`}
          </Link>
        </div>

        {/* Heading */}
        <h1 className="sell_head">
          Sell Old {`${mobile.model} (${mobile.ram} / ${mobile.storage})`}
        </h1>

        {/* Mobile View Section */}
        <div className="mobile_view">
          {/* Image Section */}
          <div className="image">
            <img src={mobile.image_url} alt={mobile.model} />
          </div>

          {/* Right Side - Details */}
          <div className="right">
            <h1>{`${mobile.model} (${mobile.ram} / ${mobile.storage})`}</h1>
            <div className="price_category">
              <h2>Get Upto</h2>
              <price>{`₹${Math.floor((mobile.price * 20) / 100)}`}</price>
              <span className="sold-info">32055+ already sold on Cashify</span>
            </div>

            {/* Button for Exact Value */}
            <Link to={`/mobileselling/evaluvation/${params.id}`}>
              <button className="exact_btn">Get Exact Value →</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMobile;
