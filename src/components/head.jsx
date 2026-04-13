import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { CartSidebar } from "./CartSidebar";
import logo from "../assets/images/gemini.png";
import "../components/header.css";
import { toast } from "react-toastify";

function Headerr(props) {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  



  const userData = JSON.parse(localStorage.getItem("user"));
  const [user, setLocalUser] = useState(userData);







  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");





  useEffect(function() {
    if (user) {
      setName(user.name || user.username || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setDob(user.DOB || "");
      setRole(user.role || "User");
    }
  }, [user]);











  // Search function
  function handleSearch(e) {
    const val = e.target.value;
    setSearchValue(val);
    props.setSearchText(val);

    if (val.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = allProducts.filter(function(item) {
        return item.title.toLowerCase().includes(val.toLowerCase());
      });
      setSuggestions(filtered);
    }
  }



  // Logout function



  
  function handleLogout() {
    localStorage.removeItem("user");
    if(props.setUser) props.setUser(null);
    toast.success("Logout Successfully!");
    navigate("/login");
  }

  // Edit function


  async function handleUpdate() {
    const updatedObj = {
      name: name,
      email: email,
      phone: phone,
      DOB: dob,
      role: role
    };

    try {
      const response = await fetch("http://localhost:4000/api/users/" + user._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedObj),
      });

      if (response.ok) {
        const finalUser = { ...user, ...updatedObj };
        localStorage.setItem("user", JSON.stringify(finalUser));
        setLocalUser(finalUser);
        setIsEditing(false);
        toast.success("Profile Updated!");
      }
    } catch (err) {
      toast.error("Update Failed!");
    }
  }

  // Delete function




  async function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete === true) {
      try {
        const response = await fetch("http://localhost:4000/api/users/" + user._id, {
          method: "DELETE"
        });
        if (response.ok) {
          toast.warn("Account Deleted!");
          handleLogout();
        }
      } catch (err) {
        toast.error("Delete Failed!");
      }
    }
  }

  return (
    <>
      <div className="head">
        <div className="head1">
          <img src={logo} alt="logo" className="logo" />
        </div>

        <div className="head2">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/service">Services</Link></li>
          </ul>
        </div>

        <div className="head3">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchValue} 
            onChange={handleSearch} 
          />

          <button className="picon" onClick={function() { setShowProfile(!showProfile); setViewDetails(false); }}>
            👤
          </button>

          {showProfile && user && (
  <div className="profile-card">
    {!viewDetails ? (
      <div className="profile-mini-view">
        <div className="mini-header">
        
          <div className="avatar-circle">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>
          <h3 style={{color:"rgba(0, 38, 255, 0.67)"}}>{name}</h3>
          <p style={{color:"rgba(0, 13, 255, 0.65)"}}>{email}</p>
          <span className="role-tag">{role}</span>
        </div>
        
        <div className="mini-menu-list">
          <button onClick={() => setViewDetails(true)} className="menu-item">
            <span className="icon">👤</span> My Account Details
          </button>
          
          {/* Agar user Admin hai toh Admin Panel ka shortcut */}
          {/* {role === "Admin" && (
            <button onClick={() => navigate("/admin")} className="menu-item">
              <span className="icon">⚙️</span> Admin Dashboard
            </button>
          )} */}
          
          <button onClick={handleLogout} className="menu-item logout-red">
            <span className="icon">🚪</span> Sign Out
          </button>
        </div>
      </div>
    ) : (
   
      <div className="profile-full-view">
        <div className="full-view-header">
          <h4>Account Settings</h4>
          <button className="close-btn-x" onClick={() => { setViewDetails(false); setIsEditing(false); }}>×</button>
        </div>

        <div className="scrollable-details">
    
          <div className="profile-input-group">
            <label>Full Name</label>
            <div className="relative-input">
              <input 
                disabled={!isEditing} 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className={isEditing ? "edit-active" : ""}
              />
              {!isEditing && <span className="pencil-icon" onClick={() => setIsEditing(true)}>✏️</span>}
            </div>
          </div>

         
          <div className="profile-input-group">
            <label>Email Address</label>
            <input disabled value={email} className="disabled-input" title="Email change restricted" />
          </div>

          <div className="profile-input-group">
            <label>Phone Number</label>
            <input 
              disabled={!isEditing} 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className={isEditing ? "edit-active" : ""}
            />
          </div>

       
          <div className="profile-input-group">
            <label>Date of Birth</label>
            <input 
              type="date" 
              disabled={!isEditing} 
              value={dob} 
              onChange={(e) => setDob(e.target.value)} 
              className={isEditing ? "edit-active" : ""}
            />
          </div>
        </div>

        <div className="profile-footer">
          {isEditing ? (
            <div className="btn-row">
              <button onClick={handleUpdate} className="btn-save-final">Save Changes</button>
              <button onClick={() => setIsEditing(false)} className="btn-cancel-final">Cancel</button>
            </div>
          ) : (
            <div className="btn-row">
              <button onClick={() => setViewDetails(false)} className="btn-back-final">Back</button>
              <button onClick={handleDelete} className="btn-delete-final">Delete Account</button>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
)}

          {searchValue && suggestions.length > 0 && (
            <div className="suggestion-box">
              {suggestions.map(function(item) {
                return (
                  <Link key={item.id} to={"/product/" + item.id} onClick={() => setSuggestions([])}>
                    {item.title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="cart-icon" onClick={() => setOpenCart(true)}>
          🛒 <span>{totalItems}</span>
        </div>
      </div>

      <CartSidebar isOpen={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
}

export { Headerr };