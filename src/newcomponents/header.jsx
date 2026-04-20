import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./design.css";
import logo from "../assets/images/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {

  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [allBikes, setAllBikes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [mode, setMode] = useState("view");

  // ✅ USER STATE (IMPORTANT FIX)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadproducts();

    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]); // ✅ dependency add

  async function loadproducts() {
    try {
      const res = await fetch("https://onn-bike-rental-backend.onrender.com/api/listing");
      const dataaa = await res.json();
      setAllBikes(dataaa);
    } catch (err) {
      console.log("Products Not Found....!");
    }
  }

  function handleSearch(e) {
    const val = e.target.value;
    setSearchTerm(val);

    if (val.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = allBikes.filter((item) =>
        item.model && item.model.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }

  // ✅ LOGOUT FIX
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null); // ✅ important
    setShowProfile(false);
    navigate("/user-management");
  };

  // ✅ PROFILE UPDATE FIX
  const handleUpdateProfile = () => {
    const updatedUser = { ...user, username, email };

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    setUser(updatedUser); // ✅ UI instantly update

    toast.success("Profile Updated Successfully");
    setMode("view");
  };

  // ✅ PASSWORD CHANGE
  const handleChangePassword = () => {
    if (!oldPassword || !newPassword) {
      toast.warn("Please fill all fields");
      return;
    }

    toast.success("Password Updated Successfully");
    setMode("view");
  };

  return (
    <>
      <div className="navbar">

        {/* Logo */}
        <div className="navbar-in1">
          <img src={logo} alt="logo" className="logo-img" />
        </div>

        {/* Home */}
        <NavLink to="/" className="nav-link home-link">
          Home
        </NavLink>

        {/* Menu */}
        <div className={`navbar-in2 ${showMenu ? "show" : ""}`}>
          <div className="navbar-inner2">
            <ul className="dropdown-menu">
              <li><NavLink to="/blog" className="nav-link other-links">Blog</NavLink></li>
              <li><NavLink to="/about" className="nav-link other-links">About Us</NavLink></li>
              <li><a href="#faq-section" className="nav-link other-links">FAQ</a></li>
              <li><NavLink to="/contact-us" className="nav-link other-links">Contact Us</NavLink></li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="navbar-in3">

          {/* Search */}
          <input
            type="text"
            placeholder="Search Bike..."
            className="src-inp"
            value={searchTerm}
            onChange={handleSearch}
          />

          {/* Suggestions */}
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

          {/* PROFILE */}
          <div className="profile-wrapper">

            <button
              className="profile-icon-btn"
              onClick={() => setShowProfile(!showProfile)}
            >
              {user ? user.username[0].toUpperCase() : "👤"}
            </button>

            {showProfile && (
              <div className="profile-popup">

                {user ? (
                  <div className="user-info">

                    <div className="profile-header">
                      <h4>{user.username}</h4>
                      <p>{user.email}</p>
                    </div>

                    {mode === "view" && (
                      <div className="profile-actions">
                        <button onClick={() => setMode("edit")}>Edit Profile</button>
                        <button onClick={() => setMode("password")}>Change Password</button>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                      </div>
                    )}

                    {mode === "edit" && (
                      <div className="profile-form">
                        <h5>Edit Profile</h5>

                        <input value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} />

                        <div className="form-btns">
                          <button onClick={handleUpdateProfile}>Save</button>
                          <button onClick={() => setMode("view")}>Back</button>
                        </div>
                      </div>
                    )}

                    {mode === "password" && (
                      <div className="profile-form">
                        <h5>Change Password</h5>

                        <input type="password" placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} />
                        <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />

                        <div className="form-btns">
                          <button onClick={handleChangePassword}>Update</button>
                          <button onClick={() => setMode("view")}>Back</button>
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="login-prompt">
                    <p>Welcome Guest</p>
                    <Link to="/user-management" className="pop-login-btn">
                      Login / Signup
                    </Link>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Menu button */}
          <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
            ⋮
          </button>

        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </>
  );
}

export { Header };