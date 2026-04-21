import React, { useEffect, useState } from "react";
import "./adminpanel.css";

function Booking() {

    const [order, setOrder] = useState([]);

    // 👉 GET ALL ORDERS
    const fetchOrder = async () => {
        try {
            const res = await fetch("https://onn-bike-rental-backend.onrender.com/api/orders");
            const data = await res.json();
            setOrder(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    // 👉 STATUS UPDATE FUNCTION
    const updateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`https://onn-bike-rental-backend.onrender.com/api/orders/${id}`, {
                method: "PUT", // 👈 backend me PUT route hona chahiye
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                // 👉 UI instant update (reload ki zaroorat nahi)
                const updatedOrders = order.map((item) =>
                    item._id === id ? { ...item, status: newStatus } : item
                );
                setOrder(updatedOrders);
            }

        } catch (err) {
            console.log("Status update failed");
        }
    };

    return (

        <div className="ordercontainer">
            <h2 className="order-count">All Booking ({order.length})</h2>

            {order.map((item) => (
                <div key={item._id} className="order-card">

                    <div className="card-in1">
                        <img src={item.bikeImage} alt={item.bikeModel} />
                        <p>Model: {item.bikeModel}</p>
                    </div>

                    <div className="card-in2">
                        <h1 className="username">Username: {item.username}</h1>
                        <p className="email">Email: {item.email}</p>
                        <strong className="mobile-number">Contact: {item.number}</strong>
                        <p className="rate">Rate: ₹{item.rate}</p>

                        <h4 className="date-section">
                            Pickup: {new Date(item.pickupDate).toLocaleString()}
                        </h4>

                        <h4 className="date-section">
                            Return: {new Date(item.returnDate).toLocaleString()}
                        </h4>

                        {/* ✅ STATUS SHOW */}
                        <p className="status">
                            Status: <b>{item.status}</b>
                        </p>

                        {/* ✅ STATUS CHANGE DROPDOWN */}
                        <select
                            value={item.status}
                            onChange={(e) => updateStatus(item._id, e.target.value)}
                            style={{ marginTop: "10px", padding: "6px" }}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                        <p className="booking-time">
                            Ordered on: {new Date(item.createdAt).toLocaleDateString()}
                        </p>

                        <div className="bill-section">
                            <b>Total Hours: {item.totalHours} hr</b>
                            <h4>Total amount: ₹{item.totalAmount}</h4>
                        </div>

                    </div>

                </div>
            ))}

        </div>
    );
}

export { Booking };