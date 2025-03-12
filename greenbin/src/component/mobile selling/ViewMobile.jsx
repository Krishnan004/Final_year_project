import React, { useContext } from 'react';
import "../../css/mobile selling/ViewMobile.css";
import { Context } from '../../context/Context';
import { useParams, Link } from 'react-router';

const ViewMobile = () => {
    const { GetMobileById,setScreen } = useContext(Context);
    const params = useParams();
    
    // Get mobile details dynamically from URL params
    let mobile = GetMobileById(params.id);
    setScreen(1);

    // Handle case where mobile is not found
    if (!mobile) {
        return <h1 className="not-found">Mobile not found</h1>;
    }

    return (
        <div>
            <h1 className="sell_head">Sell Old {`${mobile.model} (${mobile.ram} / ${mobile.storage})`}</h1>
            <div className="mobile_view">
                <div className="image">
                    <img src={mobile.image_url} alt={mobile.model} />
                </div>
                <div className="right">
                    <h1>{`${mobile.model} (${mobile.ram} / ${mobile.storage})`}</h1>
                    <div className="price_category">
                        <h2>Get Upto</h2>
                        <price>{`₹${Math.floor(mobile.price*20/100)}`}</price>
                    </div>
                    <Link to={`/mobileselling/evaluvation/${params.id}`}>
                    <button className="exact_btn">Get Exact Value</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ViewMobile;
