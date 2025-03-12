import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useParams } from "react-router-dom";

const AcceptOrder = () => {
    const [user, setUser] = useState(null);
    const [order, setOrder] = useState(null);
    const { userid, orderid } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, orderRes] = await Promise.all([
                    api.get(`/userauth/byid?id=${userid}`),
                    api.get(`/selling/condition?id=${orderid}`)
                ]);
    
                setUser(userRes.data);
                setOrder(Array.isArray(orderRes.data) ? orderRes.data[0] : orderRes.data);
                console.log("Fetched Order Data:", orderRes.data); // Debugging
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [userid, orderid]);
    

    if (!user || !order) return <div className="text-center py-5">Loading...</div>;

    // Extract condition-related keys only
    const conditionKeys = Object.keys(order).filter(
        key => !["id", "user_id", "user_email"].includes(key)
    );
    
    console.log("Condition Keys:", conditionKeys);
    

    // Format key names for better readability
    const formatKey = (key) =>
        key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Accept Order</h1>

            {/* User Information */}
            <div className="mb-4 p-3 border rounded shadow bg-gray-100">
                <label className="font-semibold text-lg">
                    User: {user?.username || "Unknown"}
                </label>
            </div>

            {/* Order Details Table */}
            <div className="overflow-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border border-gray-300 p-2">Condition</th>
                            <th className="border border-gray-300 p-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conditionKeys.length > 0 ? (
                            conditionKeys.map((key) => (
                                <tr key={key} className="border border-gray-300">
                                    <td className="border border-gray-300 p-2 font-semibold">
                                        {formatKey(key)}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {order[key] === 1 ? (
                                            <span className="text-green-600">✅ Working</span>
                                        ) : (
                                            <span className="text-red-600">❌ Not Working</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center p-4">No conditions found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AcceptOrder;
