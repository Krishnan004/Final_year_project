import React, { useEffect, useContext } from 'react';
import "../../css/mobile.css";
import { Context } from '../../context/Context';
import { Link } from 'react-router';

const Mobiles = () => {
  const { fetchMobiles, mobiles, fetchBrand, brand } = useContext(Context);

  // Use brand list directly to create unique categories
  const uniqueCategories = brand.length > 0 ? brand : ["No items"];

  useEffect(() => {
    fetchBrand();
  }, []);

  return (
    <div className="selling_portal">
      <h1>Sell Old Mobile Phone</h1>
      <h1>Brands</h1>
      <div className="brand_sec">
        {uniqueCategories.map((brand, index) => (
          <div 
            className="brand" 
            key={index} 
            onClick={() => fetchMobiles(brand)} // Fetch mobiles based on clicked brand
          >
            {brand}
          </div>
        ))}
      </div>
      <h1>Models</h1>
      <div className="mobile_sec">
        {mobiles.map((mobile, index) => (
          <Link to={`/mobileselling/${mobile.id}`}  key={index}>
          <div className="mobile" key={index}>
            <img src={mobile.image_url} alt="Image" />
            <h4>{mobile.model}</h4>
          </div>
          </Link>
        ))}
      </div>
      {(mobiles.length ==0)&&
      <div className="no_item" >No items</div>
      }
    </div>
  );
};

export default Mobiles;
