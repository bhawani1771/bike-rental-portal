import React from "react";
import "./design.css";

function Faq() {
  return (
    <div className="faq-main-container" id="faq-section">

      <h2 className="why">Top FAQ's</h2>
      <p className="better">Renting a bike made simple - Explore our FAQs for quick answers</p>

      <div className="faq-wrapper-premium">
        


        

        <div className="faq-section">
          <h3 className="premium-cat-title">Learn about ONN</h3>
          
          <details className="premium-item">
            <summary>What is ONN bikes?</summary>
            <div className="ans-content">
              <p>ONN Bikes is your comprehensive solution for all your mobility needs. We offer a diverse range of bikes and flexible plans, from daily rentals to long-term subscriptions. Whether you require a bike for a single day or are interested in a long-term commitment, we have a plan tailored just for you. Please visit our Bookings Page to explore your options.</p>
            </div>
          </details>

          <details className="premium-item">
            <summary>What Bike option are available?</summary>
            <div className="ans-content">
              <p>ICE (Internal Combustion Engine) Bikes: These range from high-performance bikes to fuel-efficient economy bikes and scooters, Electric Bikes: A selection of e-bikes and e-scooters, regularly updated with the latest models, Feel free to browse our Bookings and Commute to see all available options.</p>
            </div>
          </details>

          <details className="premium-item">
            <summary>Where is ONN currently operational?</summary>
            <div className="ans-content">
              <p>ONN Bikes is steadily expanding its footprint across India to make bike rentals accessible to more people. Currently, we operate in 20+ cities.</p>
            </div>
          </details>
        </div>





        <div className="faq-section">
          <h3 className="premium-cat-title">Getting Started</h3>
          
          <details className="premium-item">
            <summary>How do I register with ONN?</summary>
            <div className="ans-content">
              <p>Registering is simple and straightforward. You can sign up on our app or website by providing your email address and phone number. Once registered, you can start booking immediately.</p>
            </div>
          </details>

          <details className="premium-item">
            <summary>What are documents required to register and use ONN bikes?</summary>
            <div className="ans-content">
              <p>To register on our platform, all you need is a smartphone. However, at the time of pickup, you'll need to present your original driving license as a security deposit and show a valid ID for verification (such as Aadhaar, Voter ID, or Passport). To make the process smoother, you can complete an e-KYC on our platform and become a verified user.</p>
            </div>
          </details>

          <details className="premium-item">
            <summary>I am having trouble registering on the platform</summary>
            <div className="ans-content">
              <p>We're sorry to hear you're experiencing difficulties. Please try alternative registration methods, such as using your email. If the issue persists, it might be a temporary server problem. Please don't hesitate to contact our customer care or emails at info@onnbikes.com - we're here to assist you.</p>
            </div>
          </details>

          <details className="premium-item">
            <summary>I don't have a Driving license</summary>
            <div className="ans-content">
              <p>A valid original driving license is required to rent our bikes/e-bikes. However, if you don't have one, you can still enjoy our Electric Bicycle which are available in select cities. We are expanding to more locations soon and hope to serve you in your area.</p>
            </div>
          </details>
        </div>

  
        <div className="faq-section">
          <h3 className="premium-cat-title">Payments, Cancellation and Refund</h3>
          
          <details className="premium-item">
            <summary>What are the various modes of payment for the ride?</summary>
            <div className="ans-content">
              <p>We offer multiple digital payment options for your convenience UPI platforms, Digital wallets, Major credit and debit cards, Net banking. Please note, cash payments are not accepted at the station except for cases involving damages to the vehicle.</p>
            </div>
          </details>



          <details className="premium-item">
            <summary>I want to cancel my ride?</summary>
            <div className="ans-content">
              <p>Simply use the 'Cancel' button on your booking in the app. 48 hrs before: No fee | 6-48 hrs: 50% fee (min ₹100) | 1-6 hrs: 75% fee (min ₹100) | Less than 1 hr: Complete payment forfeited.</p>
            </div>
          </details>
        </div>

      </div>
    </div>
  );
}

export { Faq };