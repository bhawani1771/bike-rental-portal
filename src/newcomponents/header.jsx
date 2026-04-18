import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom"; 
import "./design.css";
import logo from "../assets/images/logo.png";

function Header() {
  const [showProfile, setShowProfile] = useState(false); // Popup toggle ke liye
  const [searchTerm, setSearchTerm] = useState(""); 
  const [allBikes, setAllBikes] = useState([]);    
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();



  const user = JSON.parse(localStorage.getItem("loggedInUser"));



  async function loadproducts() {
    try {
      const res = await fetch("https://onn-bike-rental-backend.onrender.com/api/listing");
      const dataaa = await res.json();
      setAllBikes(dataaa);
    } catch (err) {
      console.log("Products Not Found....!");
    }
  }

  useEffect(() => {
    loadproducts();
  }, []);

  // 3. Search handle karne ka function
  function handleSearch(e) {
    const val = e.target.value;
    setSearchTerm(val);

    if (val.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = allBikes.filter(function (item) {
        return item.model && item.model.toLowerCase().includes(val.toLowerCase());
      });
      setSuggestions(filtered);
    }
  }

  // 4. Logout Function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setShowProfile(false);
    navigate("/user-management");
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-in1">
          <img src={logo} alt="logo image" className="logo-img" />
        </div>

        <div className="navbar-in2">
          <ul>
            <li><NavLink to="/" className="nav-link" end>Home</NavLink></li>
            <li><NavLink to="/blog" className="nav-link">Blog</NavLink></li>
            <li><NavLink to="/about" className="nav-link">About Us</NavLink></li>
            <li><a href="#faq-section" className="nav-link">FAQ</a></li>
            <li><NavLink to="/contact-us" className="nav-link">Contact Us</NavLink></li>
          </ul>
        </div>

        <div className="navbar-in3">

          <input 
            type="text" 
            placeholder="Search Bike....." 
            className="src-inp" 
            value={searchTerm} 
            onChange={handleSearch} 
          />



          {suggestions.length > 0 && (
            <div className="search-list">
              {suggestions.map((bike) => (
                <Link 
                  to={`/product-detail/${bike._id}`} 
                  key={bike._id}
                  className="search-item"
                  onClick={() => {
                    setSearchTerm("");
                    setSuggestions([]);
                  }}
                >
                  {bike.model}
                </Link>
              ))}
            </div>
          )}

          <a href="tel:9876543211">📞</a>




          <div className="profile-wrapper" style={{ position: "relative", display: "inline-block" }}>
            <button className="profile-icon-btn" onClick={() => setShowProfile(!showProfile)}>


              {user ? user.username[0].toUpperCase() : "👤"}
            </button>

            {showProfile && (
              <div className="profile-popup">
                {user ? (

                  <div className="user-info">
                    <p><b>Hi, {user.username}</b></p>
                    <p style={{ fontSize: "12px", color: "#888" }}>{user.email}</p>
                    <hr />
                    <p className="edit-btn">Edit Profile</p>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                  </div>
                ) :
                 (

                  <div className="login-prompt">
                    <p>Welcome Guest</p>
                    <Link 
                      to="/user-management" 
                      className="pop-login-btn" 
                      onClick={() => setShowProfile(false)}
                    >
                      Login / Signup
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { Header };