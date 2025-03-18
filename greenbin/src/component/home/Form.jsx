import React, { useState, useContext } from 'react';
import "../../css/form.css";
import { Context } from '../../context/Context';
import { GiConfirmed } from 'react-icons/gi';

const Form = () => {
    const [formData, setFormData] = useState({
        place: '',
        selling_item: '',
        name: '',
        contactnumber: '',
        email: '',
        city: '',
        address: ''
    });

    const [formErrors, setFormErrors] = useState([]); // Store error messages in an array
    const [loading, setLoading] = useState(false);

    const { addEwastedetails, user } = useContext(Context);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Validate form fields
    const validateForm = () => {
        let errors = [];
        if (!formData.place) errors.push("Please select a type.");
        if (!formData.selling_item.trim()) errors.push("Selling item is required.");
        if (!formData.name.trim()) errors.push("Full name is required.");
        if (!/^\d{10}$/.test(formData.contactnumber)) errors.push("Enter a valid 10-digit contact number.");
        if (!formData.email.trim()) {
            errors.push("Email is required.");
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.push("Enter a valid email address.");
        }
        if (!formData.city) errors.push("Please select a city.");
        if (!formData.address.trim()) errors.push("Address is required.");

        setFormErrors(errors);
        return errors.length === 0; // Return true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            console.log('Form Submitted', formData);
            addEwastedetails(formData);
            setTimeout(() => {
                setLoading(false);
                setFormData({
                    place: '',
                    selling_item: '',
                    name: '',
                    contactnumber: '',
                    email: '',
                    city: '',
                    address: ''
                });
                setFormErrors([]); // Clear errors after successful submission
            }, 3000);
        }
    };

    return (
        <div className="form">
            <h1>Form</h1>

            {/* Display all error messages at the top */}
            {formErrors.length > 0 && (
                <div className="error-container">
                    <ul>
                        {formErrors.map((error, index) => (
                            <li key={index} className="error">{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {loading ? (
                <div className="confirm">
                    <GiConfirmed className="tick" />
                    <p>Order placed successfully</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} noValidate>
                    <div>
                        <select
                            name="place"
                            value={formData.place}
                            onChange={handleChange}
                        >
                            <option value="">Select type</option>
                            <option value="home">Home</option>
                            <option value="industry">Industry</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="text"
                            name="selling_item"
                            placeholder="What do you want to sell?"
                            value={formData.selling_item}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="contact_detail">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="contactnumber"
                            placeholder="Contact number"
                            value={formData.contactnumber}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        >
                            <option value="">Select City</option>
                            <option value="chennai">Chennai</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="text"
                            name="address"
                            placeholder="Enter Your Address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" disabled={loading}>Submit</button>
                </form>
            )}
        </div>
    );
};

export default Form;
