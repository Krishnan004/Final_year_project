import React, { useState, useContext } from "react";
import "../../css/mobile selling/screencheck.css";
import { Context } from "../../context/Context";

const ScreenCheck = () => {
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const { setScreen, handleSellingDetail } = useContext(Context);

    const conditions = [
        {
            image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/62a31a9a6c17e.png?p=default&s=lg",
            description: "Broken screen with visible cracks",
            key: 'no_broken_screen'
        },
        {
            image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/62a31a9a6c17e.png?p=default&s=lg",
            description: "Dead Spot/Visible line and Discoloration on screen",
            key: 'no_dead_spot'
        },
        {
            image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/62a31a9a6c17e.png?p=default&s=lg",
            description: "Scratch/Dent on device body",
            key: 'no_scratch_dent'
        },
        {
            image: "https://s3no.cashify.in/cashify/productLinePartVariation/img/xhdpi/62a87a14b538f.png?p=default&s=lg",
            description: "Device panel missing/broken",
            key: 'no_panel_missing'
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
            <h1>Tell us more about your device's screen defects?</h1>
            <p className="description">(because you selected defective screen)</p>
            <div className="device_condition">
                {conditions.map((item, index) => (
                    <div
                        className={`condition_item ${selectedIndexes.includes(index) ? "selected" : ""}`}
                        key={index}
                        onClick={() => handleSelect(index)}
                    >
                        <img src={item.image} alt="Device Condition" />
                        <div className={`discription_sec ${selectedIndexes.includes(index) ? "active" : ""}`}>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="continue_button">
                <button onClick={() => setScreen(3)}>Continue</button>
            </div>
        </div>
    );
};

export default ScreenCheck;
