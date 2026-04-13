import React from 'react';
import './css.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Our Store</h1>
        <p>Your Trusted Partner for Premium Car Accessories</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            Humne 2024 mein shuruat ki thi ek chote se sapne ke saath—ki har car owner ko 
            high-quality aur affordable accessories mil sakein. Aaj hum Maruti Suzuki, 
            Mahindra aur sabhi bade brands ke liye premium products provide karte hain.
          </p>
          <p>
            Hamara maqsad sirf saaman bechna nahi, balki aapki driving experience ko 
            safe aur comfortable banana hai.
          </p>
        </div>
        
        <div className="about-stats">
          <div className="stat-card"><h3>500+</h3><p>Products</p></div>
          <div className="stat-card"><h3>1000+</h3><p>Happy Clients</p></div>
          <div className="stat-card"><h3>24/7</h3><p>Support</p></div>
        </div>
      </div>
    </div>
  );
}

export { About };