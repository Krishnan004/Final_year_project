import React, { useEffect, useState } from "react";
import axios from "axios";

const MobileSpecs = () => {
  const [specs, setSpecs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMobileSpecs = async () => {
      try {
        const response = await axios.get(
          "https://smartphone-specifications.p.rapidapi.com/samsung/galaxy_a52_5g",
          {
            headers: {
              "x-rapidapi-key": "6fd3ea9fb7mshe026504df1edd5dp18fd16jsnc2c136d03333",
              "x-rapidapi-host": "smartphone-specifications.p.rapidapi.com",
            },
          }
        );
        setSpecs(response.data);
      } catch (err) {
        console.error("Error fetching mobile specs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMobileSpecs();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Samsung Galaxy A52 5G Specifications</h2>
      {loading && <p>Loading specifications...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {specs && (
        <div>
          <p><strong>Brand:</strong> {specs.brand}</p>
          <p><strong>Model:</strong> {specs.model}</p>
          <p><strong>Processor:</strong> {specs.processor}</p>
          <p><strong>Price:</strong> {specs.price}</p>
          {specs.image && <img src={specs.image} alt={specs.model} className="w-48 mt-2" />}
        </div>
      )}
    </div>
  );
};

export default MobileSpecs;
