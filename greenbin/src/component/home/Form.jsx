import React, { useState, useContext } from 'react';
import "../../css/form.css";
import { Context } from '../../context/Context';

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

    const { addEwastedetails,user } = useContext(Context);
    console.log(user)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted', formData);
        addEwastedetails(formData);  // Fixed variable name
    };

    return (
        <div className="form">
            <h1>Form</h1>
            <form onSubmit={handleSubmit}>
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
                        value={formData.selling_item}  // Fixed reference
                        onChange={handleChange}
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
                        value={formData.contactnumber}  // Fixed reference
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
