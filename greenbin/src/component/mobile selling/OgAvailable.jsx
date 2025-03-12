import React, { useState, useContext } from "react";
import "../../css/mobile selling/screencheck.css";
import { Context } from "../../context/Context";
import { Link, useParams } from "react-router";

const OgAvailable = () => {
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const { setScreen, handleSellingDetail, createSellingProductDetails } = useContext(Context);
    const params = useParams();

    const conditions = [
        {
            key:"original_charger",
            image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d244a8299b93.jpg?p=default&s=lg",
            description: "Original Charger Not Available "
        },
        {
            key:"phone_box",
            image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/5d244b6c82230.jpg?p=default&s=lg",
            description: "Box with same IMEI Not Available"
        }
    ];

    const handleSelect = (index) => {
        setSelectedIndexes((prevSelected) => {
            const updatedIndexes = prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index) // Deselect if already selected
                : [...prevSelected, index]; // Select if not already selected

            // Update the relevant condition key in the context state
            const selectedConditionKey = conditions[index].key;
            const selectedConditionValue = updatedIndexes.includes(index) ? false : true;

            // Call handleSellingDetail to update the context state
            handleSellingDetail(selectedConditionKey, selectedConditionValue);

            return updatedIndexes;
        });
    };
    

    return (
        <div className="screencheck">
            <h1>Do you have the following?</h1>
            <p className="description">Please select accessories which are available</p>
            <div className="device_condition">
                {conditions.map((item, index) => (
                    <div
                    className={`condition_item ${selectedIndexes.includes(index) ? "selected" : ""}`}
                    key={index}
                    onClick={() => handleSelect(index)} // Pass key instead of description
                >
                    <img src={item.image} alt="Device Condition" />
                    <div className={`discription_sec ${selectedIndexes.includes(index) ? "active" : ""}`}>
                        <p>{item.description}</p>
                    </div>
                </div>
                
                ))}
            </div>
            <div className="continue_button">
            <Link to={`/sellingportal/${params.id}`}>
                <button onClick={()=>{setScreen(1),createSellingProductDetails()}}>Continue</button>
            </Link>
            </div>
        </div>
    );
};

export default OgAvailable;
