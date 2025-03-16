import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Context } from '../../context/Context';
import ScreenCheck from '../mobile selling/ScreenCheck';
import "../../css/sell now/sellingPortal.css";
import FunctionalCheck from '../mobile selling/FunctionalCheck';
import OgAvailable from '../mobile selling/OgAvailable';
import DeviceCheck from '../mobile selling/DeviceCheck';
import ExactPrice from './ExactPrice';
import AddressDetails from './AddressDetails';

const SellingPortal = () => {
    const { GetMobileById, screen, setScreen, orderId } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    if(orderId == null){
        navigate("/mobileselling")
    }

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
                return <ExactPrice mobile={mobile} />;
            case 2:
                return <AddressDetails />;
            default:
                return <div>Failure Error</div>;
        }
    };

    return (
        <div className="device_eval">
            <div className="left">{renderScreen()}</div>
            <div className="right_part">
                <div className="mobile_display_sec">
                    <img src={mobile.image_url} alt={mobile.model} />
                    <h2>{`${mobile.model} (${mobile.ram} / ${mobile.storage})`}</h2>
                </div>
                <div className="price_sec">
                    <h2>Price Summary</h2>
                    <div>
                        <p>Base Price</p>
                        <p>₹{Math.floor(mobile.price*5/100)}</p>
                    </div>
                    <div>
                        <p>Pickup Charges</p>
                        <p>Free ₹100</p>
                    </div>
                    <div>
                        <p>Total Amount</p>
                        <p>₹3,040</p>
                    </div>
                    <button className="btn" onClick={()=>setScreen(2)}>Sell Now</button>
                </div>
            </div>
        </div>
    );
};

export default SellingPortal;
