import React, { useEffect, useState } from "react";
import "./adminpanel.css";


function Booking() {
    const [order, setOrder] = useState([]);

    const fetchOrder = async () => {

        const apiurl = await fetch("http://localhost:4000/api/orders");
        const data = await apiurl.json();
        setOrder(data);
    }


    useEffect(() => {
        fetchOrder()
    }, []);


    return (

        <div className="ordercontainer">
            <h2 className="order-count">All Booking({order.length})</h2>

            {order.map((item) => (
                <div key={item._id} className="order-card">
                    <div className="card-in1">
                        <img src={item.bikeImage} alt={item.bikeModel} />
                        <p>Model:{item.bikeModel}</p>
                    </div>


                    <div className="card-in2">
                        <h1 className="username">Username: {item.username}</h1>
                        <p className="email">Email:{item.email}</p>
                        <strong className="mobile-number">Contact:{item.number}</strong>
                        <p className="rate">Rate:₹{item.rate}</p>
                        <h4 className="date-section">Pickup: {new Date(item.pickupDate).toLocaleString()}</h4>
                        <h4 className="date-section">Return: {new Date(item.returnDate).toLocaleString()}</h4>
                        <p className="status">Status:{item.status}</p>
                        <p className="booking-time">Ordered on: {new Date(item.createdAt).toLocaleDateString()}</p>
                        <div className="bill-section">
                            <b>Total Hours:{item.totalHours} hr</b>
                            <h4>Total amount: ₹{item.totalAmount}</h4>
                        </div>

                    </div>
                </div>
            ))}

        </div>

    )
}
export { Booking }