import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./adminlogin.css";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
       
        if (email === "aaaa" && password === "zzzz") {
            toast.success("Welcome Back, Admin!");
            localStorage.setItem("isAdmin", "true"); 
            
            setTimeout(() => {
                window.location.href = "/"
            }, 800);
        } else {
            toast.error("Galat Email ya Password!");
        }
    };

    return (
        <div className="login-full-page">
            <div className="login-card">
                <div className="login-logo">
                    Dream<span>Bike</span> Admin
                </div>
                <h2>Sign In</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            type="text" 
                            placeholder="admin@example.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder=".........." 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="login-btn">Login to Dashboard</button>
                </form>
            </div>
        </div>
    );
}

export { AdminLogin };