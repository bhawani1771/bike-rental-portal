import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./design.css";

function OrderForm() {

    const location = useLocation();
    const navigate = useNavigate();

   
    const bikeDetails = location.state?.bikeDetails;

    // 👉 user data localStorage se
    const [user] = useState(JSON.parse(localStorage.getItem("loggedInUser")));

    // 👉 form state
    const [dates, setDates] = useState({
        pickupDate: "",
        returnDate: ""
    });

    // 👉 loading state (button disable karne ke liye)
    const [loading, setLoading] = useState(false);

    // 👉 input handle
    const handleInput = (e) => {
        setDates({ ...dates, [e.target.name]: e.target.value });
    };

    // 👉 hours calculation (safe way)
    const diffInMs = new Date(dates.returnDate) - new Date(dates.pickupDate);
    const hours = diffInMs > 0 ? Math.ceil(diffInMs / 3600000) : 0;

    // 👉 total price
    const totalBill = hours * (bikeDetails?.rate || 0);

    // 👉 ORDER PLACE FUNCTION
    const placeOrder = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Pehle login karo");
            navigate("/user-management");
            return;
        }

        // 👉 date validation
        if (hours <= 0) {
            toast.warn("Return date pickup se bada hona chahiye");
            return;
        }

        setLoading(true);

        // 👉 schema ke according final data
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
                toast.success("Booking Confirmed 🚀");

               
                setTimeout(() => {
                    navigate("/");
                }, 2000);

            } else {
                toast.error("Error in booking");
            }
        } catch (err) {
            toast.error("Server issue!");
        }

        setLoading(false);
    };


const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
};



    return (
        <div className="order-container">

            <ToastContainer theme="dark" position="top-center" />

            <div className="order-grid">

                {/* LEFT SIDE FORM */}
                <form className="order-form" onSubmit={placeOrder}>

                    <h2>Booking Details</h2>

                    {/* USER INFO */}
                    <div className="user-box">
                        <p><strong>Name:</strong> {user?.username || "Guest"}</p>
                        <p><strong>Email:</strong> {user?.email || "-"}</p>
                        <p><strong>Mobile no:</strong> {user?.number || "-"}</p>
                    </div>

                    {/* BIKE INFO */}
                    <div className="bike-box">
                        <img src={bikeDetails?.image} alt="" />
                        <p>{bikeDetails?.model}</p>
                        <span>₹{bikeDetails?.rate} / hour</span>
                    </div>

                    {/* DATE INPUT */}
                    <label>Pickup Date & Time</label>
                    <input
                        type="datetime-local"
                        name="pickupDate"
                        min={getCurrentDateTime()} 
                        onChange={handleInput}
                        required
                    />

                    <label>Return Date & Time</label>
                    <input
                        type="datetime-local"
                        name="returnDate"
                         min={dates.pickupDate || getCurrentDateTime()} 
                        onChange={handleInput}
                        required
                    />

                    <button disabled={loading} className="book-btn">
                        {loading ? "Processing..." : "Confirm Booking"}
                    </button>

                </form>

                <div className="summary-box">

                    <h3>Payment Summary</h3>

                    <div className="summary-item">
                        <span>Rate (per hour)</span>
                        <span>₹{bikeDetails?.rate}</span>
                    </div>

                    <div className="summary-item">
                        <span>Total Hours</span>
                        <span>{hours}</span>
                    </div>

                    <div className="summary-item total">
                        <span>Total Amount</span>
                        <span>₹{totalBill}</span>
                    </div>

                    <p className="note">* Pay at pickup time</p>

                </div>

            </div>
        </div>
    );
}

export { OrderForm };