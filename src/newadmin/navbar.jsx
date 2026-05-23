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
        <li><NavLink to="/admin/" className={location.pathname === "/" ? "active" : ""}>Home</NavLink></li>
        <li><NavLink to="/admin/listing" className={location.pathname === "/listing" ? "active" : ""}>Listing</NavLink></li>
        <li><NavLink to="/admin/user-management" className={location.pathname === "/user-management" ? "active" : ""}>Users</NavLink></li>
        <li><NavLink to="/admin/bookings" className={location.pathname === "/booking" ? "active" : ""}>Booking</NavLink></li>
        <li><NavLink to="/admin/review" className={location.pathname === "/review" ? "active" : ""}>Review</NavLink></li>
     </ul>
    <button 
  className="logout-btn" 
  onClick={handleLogout}>Logout 🚪</button>

 <button style={{marginTop:"10px"}}
  className="logout-btn">
< NavLink to="/" style={{textDecoration:"none" , color:"black"}}>User-panel</NavLink></button>


    </nav>
  );
}

export { Navbar };