import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../../css/admin/mobileOrder.css"
const MobileOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/selling/condition"); // Fetch from your backend
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching mobile orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Mobile Orders</h2>
            <div className="overflow-auto">
                <table className="mobile-order-table">
                    <thead>
                        <tr className="table-header">
                            <th className="table-cell-heading">ID</th>
                            <th className="table-cell-heading">User ID</th>
                            <th className="table-cell-heading">Email</th>
                            {orders.length > 0 &&
                                Object.keys(orders[0]).slice(3).map((key) => (
                                    <th key={key} className="table-cell-heading">
                                        {key.replace(/_/g, " ")}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="table-row">
                                <td className="table-cell">{order.id}</td>
                                <td className="table-cell">{order.user_id}</td>
                                <td className="table-cell">{order.email}</td> {/* Fixed typo here */}
                                {Object.keys(order).slice(3).map((key) => (
                                    <td key={key} className="table-cell">
                                        {order[key] ? (
                                            <span className="status-yes">✅</span>
                                        ) : (
                                            <span className="status-no">❌</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MobileOrder;
