import React, { useContext, useState } from 'react';
import '../../css/sell now/addressDetail.css'; // Assuming you have a separate CSS file for styling
import { Context } from '../../context/Context'; // Import your context
import { useNavigate } from 'react-router';
import { GiConfirmed } from "react-icons/gi";


const AddressDetails = () => {
  const [address, setAddress] = useState('');
  const [upid, setUpid] = useState('');
  const [pincode, setPincode] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [error, setError] = useState('');
  const [order, setOrder] = useState(false); // Track order submission status

  const {
    postAddressDetails, // Accessing postAddressDetails from context
    setLoading, // You can use this to set loading if needed
  } = useContext(Context); // Access the context

  const navigate = useNavigate();

  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleUpidChange = (e) => setUpid(e.target.value);
  const handlePincodeChange = (e) => setPincode(e.target.value);
  const handleLocalityChange = (e) => setLocality(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleAlternatePhoneChange = (e) => setAlternatePhone(e.target.value);

  // Basic form validation
  const validateForm = () => {
    if (!address || !upid || !pincode || !city) {
      setError('Please fill in all required fields.');
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      setError('Please enter a valid 6-digit pincode.');
      return false;
    }
    if (alternatePhone && !/^\d{10}$/.test(alternatePhone)) {
      setError('Please enter a valid 10-digit alternate phone number.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message before submitting
  
    if (!validateForm()) return; // Validate form before submitting
  
    // Prepare data to be submitted
    const addressData = {
      address,
      upid,
      pincode,
      locality,
      city,
      alternatePhone,
    };
  
    try {
      setLoading(true); // Optionally show loading spinner
      await postAddressDetails(addressData); // Post address details via context function
      console.log('Address details submitted successfully');
      
      // Set order status to true
      setOrder(true);
      
      // Reset the form
      setAddress('');
      setUpid('');
      setPincode('');
      setLocality('');
      setCity('');
      setAlternatePhone('');
      
      setTimeout(()=>{
        navigate("/mobileselling")
      },3000)
      // Optionally show a success message or alert
    } catch (err) {
      console.error('Error submitting address details:', err);
      setError('Failed to submit address details. Please try again.');
    } finally {
      setLoading(false); // Stop loading once the request is complete
    }
  };

  return (
    <div className="address-details-container">
      <h2>Enter Address Details</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      {order ? (
        <div className="confirm" >
          <GiConfirmed className="tick"/>
          <p>Order placed successfully</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="upid">Customer UPID:</label>
            <input
              type="text"
              id="upid"
              name="upid"
              value={upid}
              onChange={handleUpidChange}
              placeholder="Enter your UPID"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pincode">Pincode:</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={pincode}
              onChange={handlePincodeChange}
              placeholder="Enter your Pincode"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="locality">Place/Locality (Optional):</label>
            <input
              type="text"
              id="locality"
              name="locality"
              value={locality}
              onChange={handleLocalityChange}
              placeholder="Enter your Place/Locality"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={handleCityChange}
              placeholder="Enter your City"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="alternatePhone">Alternate Phone Number (Optional):</label>
            <input
              type="text"
              id="alternatePhone"
              name="alternatePhone"
              value={alternatePhone}
              onChange={handleAlternatePhoneChange}
              placeholder="Enter alternate phone number"
            />
          </div>

          <button type="submit" className="btn">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AddressDetails;
