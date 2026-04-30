import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./loginform.css";
import { useNavigate } from "react-router-dom";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    const [info, setInfo] = useState({});
    const navigate = useNavigate();



    useEffect(() => {
        setInfo({});
    }, [isLogin]);

    const handleInput = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const dataToPost = {
            ...info,
            number: String(info.number)
        };

        if (!info.number || info.number.length !== 10) {
            return toast.error("Please enter valid 10-digit number");
        }
        if (!info.password || info.password.length < 6) {
            return toast.error("Minimum 6 Character required to fill password");
        }

        try {
            if (isLogin) {


                const res = await fetch("https://onn-bike-rental-backend.onrender.com/api/bikeusers");
                const users = await res.json();



                const userFound = users.find(u => u.number === info.number && u.password === info.password);

                if (userFound) {
                    localStorage.setItem("loggedInUser", JSON.stringify(userFound));
                    toast.success(`Welcome back, ${userFound.username}!`);

                    setTimeout(() => {
                        // navigate("/");
                        window.location.href = "/";
                    }, 1500);

                } else {
                    toast.error("Incorrect number or password");
                }

            } else {

                const res = await fetch("https://onn-bike-rental-backend.onrender.com/api/bikeusers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dataToPost)
                });

                if (res.ok) {
                    toast.success("Account Created , Please login now");
                    setInfo({});
                    setIsLogin(true);
                } else {
                    toast.warn("Something went wrong , Please check detail");
                }
            }
        } catch (err) {
            toast.error("Server error please try again later ");
        }
    };

    return (
        <div className="form-container">
            <ToastContainer theme="dark" position="top-center" autoClose={2000} />

            <button className="back-btn" onClick={() => navigate("/")}>X</button>

            <form onSubmit={handleSubmit}>
                <h2>{isLogin ? "Login Now" : "Create Account"}</h2>




                {!isLogin && (
                    <>
                        <input type="text" placeholder="Username" name="username" onChange={handleInput} required />
                        <input type="email" placeholder="Email Address" name="email" onChange={handleInput} required />
                    </>
                )}

                {/* Login aur Signup dono mein ye chahiye */}
                <input type="number" placeholder="Mobile Number" name="number" onChange={handleInput} required />
                <input type="password" placeholder="Password" name="password" onChange={handleInput} required />

                <button type="submit" className="main-btn">
                    {isLogin ? "Login" : "Register"}
                </button>

                <p className="toggle-text">
                    {isLogin ? "Create Account ? " : "Already as a user ? "}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Register" : "Login"}
                    </span>
                </p>
            </form>
        </div>
    );
}

export { Auth };