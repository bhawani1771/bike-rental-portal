import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../components/header.css";

function Login({ setUser }) {
  const [isSignup, setIsSignup] = useState(false);

 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");

  const navigate = useNavigate();
  const apiurl = "http://localhost:4000/api/users";


  async function handleLogin(e) {
    e.preventDefault();
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    try {
      const res = await fetch(apiurl);
      const users = await res.json();

      const userFound = users.find(
        (u) => 
          (u.name?.toLowerCase() === cleanUsername.toLowerCase() || 
           u.email?.toLowerCase() === cleanUsername.toLowerCase()) && 
           u.password === cleanPassword
      );

      if (userFound) {
        localStorage.setItem("user", JSON.stringify(userFound));
        if(setUser) setUser(userFound);
        toast.success(`Welcome back, ${userFound.name}! 🎉`);
        navigate("/");
      } else {
        toast.error("Invalid credentials! ❌");
      }
    } catch (error) {
      toast.error("Server Error! Check backend.");
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    
    const newUser = {
      name: username.trim(),
      email: email.trim(),
      password: password.trim(),
      phone: mobile,
      DOB: dob,
      role: "User"
    };

    try {
      const res = await fetch(apiurl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (res.ok) {
        toast.success("Account created! Please login. ✨");
        setIsSignup(false); 
      } else {
        toast.error("Signup failed! Try again.");
      }
    } catch (error) {
      toast.error("Server connection error! ⚠️");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{isSignup ? "Create Account" : "Login"}</h2>

        <form onSubmit={isSignup ? handleSignup : handleLogin} className="login-form">
          
   
          <input
            type="text"
            placeholder={isSignup ? "Full Name" : "Name or Email"}
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

        
          {isSignup && (
            <>
              <input
                type="email"
                placeholder="Email Address"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Mobile Number"
                className="login-input"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <input
                type="date"
                className="login-input"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </>
          )}

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

       
        <div className="toggle-container" style={{ marginTop: "15px", textAlign: "center" }}>
          <p style={{ fontSize: "14px" }}>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span 
              onClick={() => {
                setIsSignup(!isSignup);
                setUsername(""); 
                setPassword("");
              }}
              style={{ color: "#3b82f6", cursor: "pointer", marginLeft: "5px", fontWeight: "bold" }}
            >
              {isSignup ? "Login here" : "Sign up here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export { Login };