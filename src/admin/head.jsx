import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./admin.css";
import {AdminLogin} from "./adminLogin"

function Head() {
const navigate = useNavigate();

const [showProfile , setShowProfile] = useState(false)

    const adminName = localStorage.getItem("adminName");
    const adminEmail = localStorage.getItem("adminEmail");
    const adminRole = localStorage.getItem("adminRole");


const handleLogout = () => {
    if(window.confirm("Are You Sure To Logout")){
        localStorage.clear();
        window.location.href = "/adminLogin";
    }
}


    return (
        <>
            <div className="boxx">
                <div className="boxx-in1">
<div className="profile-wrapper" onClick={() => setShowProfile(!showProfile)}>
                    <p className="profile icon">👤 {adminName}</p>
                    
                    {showProfile && (
                        <div className="profile-dropdown">
                            <h4 style={{margin: "0 0 10px 0", color: "#007bff"}}>Admin Profile</h4>
                            <p><strong>Name:</strong> {adminName}</p>
                            <p><strong>Email:</strong> {adminEmail}</p>
                            <p style={{textTransform: "capitalize"}}><strong>Role:</strong> {adminRole}</p>
                            <hr />
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
                    

                </div>

                <div className="boxx-in2">
                    <Link to="/home" className="nav-link">Home</Link>

                    <Link to="/users" className="nav-link">Users</Link>

                    <Link to="/products" className="nav-link">Products </Link>

                    <Link to="/orders" className="nav-link">Orders</Link>
                </div>
            </div>
        </>
    );
}

export { Head };