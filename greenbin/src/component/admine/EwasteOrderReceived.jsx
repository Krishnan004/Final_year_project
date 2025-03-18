import React, { useEffect, useState, useContext } from "react";
import "../../css/admin/orderplaced.css";
import api from "../../api/api";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const EwasteOrderReceived = () => {
    const [orders, setOrders] = useState([]); // State to store order details

    // Fetch data from the API
    const fetchOrderDetails = async () => {
        try {
            const response = await api.get("/selling/ewastereceived");
            setOrders(response.data); // Store the array of orders in state
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    // Call fetchOrderDetails when component mounts
    useEffect(() => {
        fetchOrderDetails();
    }, []);

    

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Orders Placed</h2>
            <div className="router-category">
                                        <Link to="/admine">
                                        <button>Confirm the order</button>
                                        </Link>
                                        <Link to="/orderreceived">
                                        <button>Order Received</button>
                                        </Link>
                                        <Link to="/ewastereceived">
                                        <button>E-waste Order Received</button>
                                        </Link>
                                        <Link to="/ewaste">
                                        <button>E-waste Order Placed</button>
                                        </Link>
                                    </div>
            <div className="overflow-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-200 text-left">
                            <th className="border border-gray-300 p-2">Address</th>
                            <th className="border border-gray-300 p-2">Product</th>
                            <th className="border border-gray-300 p-2">City</th>
                            <th className="border border-gray-300 p-2">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={index} className="border border-gray-300 hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline hover:text-green-600"
                                        >
                                            {order.address}
                                        </a>
                                    </td>

                                    <td className="border border-gray-300 p-2">{order.selling_item}</td>
                                    <td className="border border-gray-300 p-2">{order.city || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{order.contactnumber || "N/A"}</td>
                                    
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EwasteOrderReceived;
