import React from 'react'
import "../../css/sell now/exactPrice.css"

const ExactPrice = ({mobile}) => {
    return (
        <div className="content_excat">
            <div className="left">
                <img src={mobile.image_url} alt=""/>
            </div>
            <div className="right">
                <h1>{`${mobile.model} (${mobile.ram} / ${mobile.storage})`}</h1>
                <p>Selling price :</p>
                <price>₹{Math.floor(mobile.price*5/100)}</price>
                <p>Recalculate</p>
                <div className="plus_point">
                    <div>
                        <img src="https://s3no.beta.cashify.in/estore/fc5ba3b5d52044fbb7ced6cc55b9c7b1.png?p=default&s=lg" alt=""/>
                        <p>Fast Payments</p>
                    </div>
                    <div>
                        <img src="https://s3no.beta.cashify.in/estore/779eb9765e354381aa077863aa842995.png?p=default&s=lg" alt=""/>
                        <p>Free Pickup</p>
                    </div>
                    <div>
                        <img src="https://s3no.beta.cashify.in/estore/aefeb53bbd154b17a5322dddea5a769d.png?p=default&s=lg" alt=""/>
                        <p>100% Safe</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExactPrice
