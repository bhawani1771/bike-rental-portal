import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const res = await fetch("http://localhost:4000/api/users");
            const data = await res.json();

            const admin = data.find(u => u.email === email && u.password === password);

            if (admin && admin.role === "Admin") {
                localStorage.setItem("isAdmin", "true");
                localStorage.setItem("adminName", admin.uname);
                localStorage.setItem("adminEmail", admin.email);
                localStorage.setItem("adminRole", admin.role);
              window.location.href = "/home";
            } else {
                alert("Invalid Detail or Not an Admin!");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
    <div className="login-page">
        <div className="login-card">
            <h2>Admin Secure Login</h2>
            <div className="input-group">
                <input type="text" placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="input-group">
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <button className="login-btn" onClick={handleLogin}>Login to Dashboard</button>
        </div>
    </div>
);
}

export { AdminLogin };  