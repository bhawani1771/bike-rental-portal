import React from "react";
import '../components/header.css'

function Banner() {
  return (
    <div className="banner">
      <div className="banner-in">
        <h1>Welcome to Our Website</h1>
        <p>Your success is our mission</p>
        <button  className="start">Get Started</button>
      </div>
    </div>
  );
}

export{Banner}
