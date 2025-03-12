import React, { useEffect, useState, useContext } from 'react';
import "../../css/admin/orderplaced.css";
import api from '../../api/api';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

const OrderPlaced = () => {
    const [orders, setOrders] = useState([]); // State to store order details

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await api.get('/selling/orderplaced');
                setOrders(response.data); // Store the array of orders in state
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, []);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Orders Placed</h2>
            <div className="overflow-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border border-gray-300 p-2">Address</th>
                            <th className="border border-gray-300 p-2">Pincode</th>
                            <th className="border border-gray-300 p-2">Locality</th>
                            <th className="border border-gray-300 p-2">UPID</th>
                            <th className="border border-gray-300 p-2">Alternate Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={index} className="border border-gray-300 hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">
                                        <Link to={`/acceptorder/${order.userid}/${order.order_id}`} className="text-blue-500 underline">
                                            {order.address}
                                        </Link>
                                    </td>
                                    <td className="border border-gray-300 p-2">{order.pincode}</td>
                                    <td className="border border-gray-300 p-2">{order.locality || 'N/A'}</td>
                                    <td className="border border-gray-300 p-2">{order.upid || 'N/A'}</td>
                                    <td className="border border-gray-300 p-2">{order.alternate_phonenumber || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderPlaced;
