import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Context } from '../../context/Context';
import DeviceCheck from './DeviceCheck';
import ScreenCheck from './ScreenCheck';
import "../../css/mobile selling/deviceEvaluvation.css";
import FunctionalCheck from './FunctionalCheck';
import OgAvailable from './OgAvailable';

const DeviceEvaluvation = () => {
    const { GetMobileById, screen, setScreen, sellingProductDetails } = useContext(Context);
    const { id } = useParams();
    const arrayOfSellingDetails = Object.entries(sellingProductDetails).map(([key, value]) => ({ [key]: value }));
    console.log(arrayOfSellingDetails)
    // Output: [{a: 1}, {b: 2}, {c: 3}]


    // Get mobile details dynamically from URL params
    let mobile = GetMobileById(id);


    // Handle case where mobile is not found
    if (!mobile) {
        return <h1 className="not-found">Mobile not found</h1>;
    }

    // Function to handle different screens
    const renderScreen = () => {
        switch (screen) {
            case 1:
                return <DeviceCheck />;
            case 2:
                return <ScreenCheck />;
            case 3:
                return <FunctionalCheck />;
            case 4:
                return <OgAvailable />;
            default:
                return <div>Failure Error</div>;
        }
    };

    return (
        <div className="device_eval">
            <div className="left">{renderScreen()}</div>
            <div className="right">
                <div className="mobile_display">
                    <img src={mobile.image_url} alt={mobile.model} />
                    <h2>{`${mobile.model} (${mobile.ram} / ${mobile.storage})`}</h2>
                </div>
                <div className="evaluation">
                    <h4>Defective</h4>
                    {arrayOfSellingDetails.map((item, index) => {
                        const key = Object.keys(item)[0];  // Extract key
                        const value = item[key];           // Extract value
                        return (
                            !value && (
                                <div key={index} className="detail">
                                    <label htmlFor={key}>{key}</label>
                                </div>
                            )
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default DeviceEvaluvation;
