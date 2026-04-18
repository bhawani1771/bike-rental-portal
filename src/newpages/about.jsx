import React from "react";
import "./page.css";

function Newabout() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to Onn Bike Rental</h1>
          <p>Your journey in world, redefined with comfort and speed.</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="intro-section">
        <h2>Who We Are</h2>
        <p>Founded with a vision to make premium bike rentals accessible, Onn Bike Rental has become the go-to choice for thousands of riders. We believe that every kilometer you travel should be memorable, safe, and efficient.</p>
      </section>

      {/* Core Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h3>Safety First</h3>
            <p>Every bike goes through a 20-point mechanical inspection before reaching you.</p>
          </div>
          <div className="value-item">
            <h3>Customer Obsession</h3>
            <p>Our support team works 24/7 to ensure your ride never stops.</p>
          </div>
          <div className="value-item">
            <h3>Transparency</h3>
            <p>No hidden costs, no surprises. What you see is what you pay.</p>
          </div>
          <div className="value-item">
            <h3>Sustainability</h3>
            <p>We are transitioning to fuel-efficient and electric mobility solutions.</p>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="journey-section">
        <h2>Our Journey</h2>
        <p>From a small local shop to the biggest rental fleet in the region, we've focused on one thing: Quality. Today, we manage over 50+ bikes and serve happy customers every single day.</p>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to hit the road?</h2>
        <button onClick={() => window.location.href='/listing'}>View Our Bikes</button>
      </section>
    </div>
  );
}

export  {Newabout};