import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./design.css"; 

function OrderForm() {

    const location = useLocation();
    const navigate = useNavigate();

    const bikeDetails = location.state?.bikeDetails;


    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    const [dates, setDates] = useState({
        pickupDate: "",
        returnDate: ""
    });

    const diffInMs = new Date(dates.returnDate) - new Date(dates.pickupDate);
    const hours = Math.ceil(diffInMs / 3600000);
    const totalBill = hours * (bikeDetails?.rate || 0);

    const handleInput = (e) => {
        setDates({ ...dates, [e.target.name]: e.target.value });
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        if (!user) {
            return toast.error("Bhai, pehle login kar lo!");
            navigate("./user-management")
        }

        const finalOrder = {
            username: user.username,
            email: user.email,
            number: user.number,
            bikeModel: bikeDetails?.model,
            bikeImage: bikeDetails?.image, 
            rate: bikeDetails?.rate,       
            pickupDate: dates.pickupDate,
            returnDate: dates.returnDate,
            totalHours: hours,    
            totalAmount: totalBill
        };

        try {
            const res = await fetch("https://onn-bike-rental-backend.onrender.com/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalOrder)
            });

            if (res.ok) {
                toast.success("Booking confirmed 🏍️");
            } else {
                toast.error("Something went wrong please check detail");
            }
        } catch (err) {
            toast.error("Server connection problem!");
        }
    };

    return (
        <div className="order-box">
            <ToastContainer theme="dark" position="top-center" />
            <h3>Confirm Your Booking</h3>

            <form onSubmit={placeOrder}>



                <div className="user-static-info">
                    <p><strong>Rider:</strong> {user ? user.username : "Please Login"}</p>
                    <p><strong>Bike:</strong> {bikeDetails?.model}</p>
                    <img src={bikeDetails?.image} alt="" style={{ width: "100px" }} />
                </div>

                <div className="date-inputs">
                    <label>Pickup Date & Time</label>
                    <input
                        type="datetime-local"
                        name="pickupDate"
                        onChange={handleInput}
                        required
                    />

                    <label>Return Date & Time</label>
                    <input
                        type="datetime-local"
                        name="returnDate"
                        onChange={handleInput}
                        required
                    />
                </div>

                <button type="submit" className="book-now-btn">Confirm Order</button>
            </form>
        </div>
    );
}

export { OrderForm };