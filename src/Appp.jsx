import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route , Navigate, useLocation } from "react-router-dom";
import { Head } from "./admin/head";
import { User } from "./admin/users";
import { Product } from "./admin/product";
import { Home } from "./admin/home";
import { Orders } from "./admin/order";
import { AdminLogin } from "./admin/adminLogin";


function Appp() {
const [auth, setAuth] = useState(localStorage.getItem("isAdmin") === "true");
useEffect(() => {
        const status = localStorage.getItem("isAdmin") === "true";
        setAuth(status);
    }, []);


if (auth === null) return <div>Loading...</div>;

    const isLoginPage = window.location.pathname === "/adminLogin";

    return (
        <BrowserRouter>
            <div style={{ display: "flex" }}>
            {auth && !isLoginPage && <Head />}
                <Routes>
                    <Route 
                        path="/adminLogin" 
                        element={auth ? <Navigate to="/home" replace /> : <AdminLogin />} 
                    />
                  <Route path="/home" element={auth ? <Home /> : <Navigate to="/adminLogin" replace />} />
                        <Route path="/users" element={auth ? <User /> : <Navigate to="/adminLogin" replace />} />
                        <Route path="/products" element={auth ? <Product /> : <Navigate to="/adminLogin" replace />} />
                        <Route path="/orders" element={auth ? <Orders /> : <Navigate to="/adminLogin" replace />} />
                        
                        {/* Default Route */}
                        <Route path="/" element={auth ? <Home /> : <Navigate to="/adminLogin" replace />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export { Appp };