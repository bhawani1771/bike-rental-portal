import React from "react";
import { NavLink, useLocation , useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./adminpanel.css";

function Navbar() {
  const location = useLocation(); 

 const  handleLogout = ()=> {
    localStorage.removeItem("isAdmin");
    toast.success("You have been logged out");
    setTimeout(() => {
     window.location.href = "/login";

      
    }, 800);
  }


  return (
    <nav className="admin-sidebar">
      <div className="nav-logo">
        <NavLink to="/">Dream<span>Bike</span></NavLink>
      </div>
      
     <ul>
        <li><NavLink to="/" className={location.pathname === "/" ? "active" : ""}>Home</NavLink></li>
        <li><NavLink to="/listing" className={location.pathname === "/listing" ? "active" : ""}>Listing</NavLink></li>
        <li><NavLink to="/user-management" className={location.pathname === "/user-management" ? "active" : ""}>Users</NavLink></li>
        <li><NavLink to="/bookings" className={location.pathname === "/booking" ? "active" : ""}>Booking</NavLink></li>
        <li><NavLink to="/review" className={location.pathname === "/review" ? "active" : ""}>Review</NavLink></li>
     </ul>
    <button 
  className="logout-btn" 
  onClick={handleLogout}>Logout 🚪</button>
    </nav>
  );
}

export { Navbar };