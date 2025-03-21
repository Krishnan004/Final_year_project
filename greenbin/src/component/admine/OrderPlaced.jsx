import React, { useEffect, useState, useContext } from "react";
import "../../css/admin/orderplaced.css";
import api from "../../api/api";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import Loading from "../../context/Loading";
import AdminLogin from "../authentication/AdminLogin";

const OrderPlaced = () => {
    const [orders, setOrders] = useState([]); // State to store order details
    const { handleConfirmOrder } = useContext(Context);

    
    // Fetch data from the API
    const fetchOrderDetails = async () => {
        try {
            const response = await api.get("/selling/orderplaced");
            setOrders(response.data); // Store the array of orders in state
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    // Call fetchOrderDetails when component mounts
    useEffect(() => {
        fetchOrderDetails();
    }, []);

    // Handle order confirmation and update UI
    const handleConfirmClick = async (status, orderId) => {
        await handleConfirmOrder(status, orderId);
        fetchOrderDetails(); // Refresh the order list after updating
    };

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
                            <th className="border border-gray-300 p-2">Pincode</th>
                            <th className="border border-gray-300 p-2">Locality</th>
                            <th className="border border-gray-300 p-2">UPID</th>
                            <th className="border border-gray-300 p-2">Alternate Phone</th>
                            <th className="border border-gray-300 p-2">Confirm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={index} className="border border-gray-300 hover:bg-gray-100">
                                    <td className="border border-gray-300 p-2">
                                        <Link
                                            to={`/acceptorder/${order.userid}/${order.order_id}`}
                                            className="text-blue-500 underline"
                                        >
                                            {order.address}
                                        </Link>
                                    </td>
                                    <td className="border border-gray-300 p-2">{order.pincode}</td>
                                    <td className="border border-gray-300 p-2">{order.locality || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{order.upid || "N/A"}</td>
                                    <td className="border border-gray-300 p-2">{order.alternate_phonenumber || "N/A"}</td>
                                    <td
                                        className={`btn2 ${order.order_confirm ? "cancel" : ""}`}
                                        onClick={() => handleConfirmClick(order.order_confirm ? 0 : 1, order.id)}
                                    >
                                        {order.order_confirm ? "Cancel" : "Confirm"}
                                    </td>
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

export default OrderPlaced;
