import React, { useState } from "react";
import { toast } from "react-hot-toast";
import "./page.css"; // अपनी CSS फाइल यहाँ इम्पोर्ट करें

function Contactus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://onn-bike-rental-backend.onrender.com/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Enquiry sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Failed to send enquiry.");
      }
    } catch (error) {
      toast.error("Server error, please try again later.");
    }
  };

  return (
    <div className="contact-main-wrapper">
      <h1 className="contact-title">Get in Touch</h1>
      
      <div className="contact-grid">
        
        {/* Left Side: Static Contact Info */}
        <div className="contact-info-section">
          <h3 className="section-subtitle">Contact Information</h3>
          <p className="section-desc">
            Have questions about our bike rentals? Our team is here to help you 24/7.
          </p>
          
          <div className="info-details">
            <div className="info-item">
              <strong>📍 Address:</strong>
              <span>123 Bike Street, Near City Center, Jaipur, Rajasthan</span>
            </div>
            <div className="info-item">
              <strong>📞 Phone:</strong>
              <span>+91 98765 43210</span>
            </div>
            <div className="info-item">
              <strong>✉️ Email:</strong>
              <span>support@onnbikes.com</span>
            </div>
            <div className="info-item">
              <strong>⏰ Working Hours:</strong>
              <span>Monday - Sunday (8:00 AM - 10:00 PM)</span>
            </div>
          </div>

          <div className="map-container">
            <iframe
              title="Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.382562431!2d75.6504692!3d26.8854479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000"
              className="google-map-iframe"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-section">
          <h3 className="section-subtitle">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            
            <div className="form-group">
              <label>Full Name</label>
              <input 
                name="name" 
                type="text" 
                placeholder="Enter your name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input 
                name="email" 
                type="email" 
                placeholder="Enter your Email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                name="phone" 
                type="number" 
                placeholder="Enter your mobile no." 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Your Message</label>
              <textarea 
                name="message" 
                placeholder="Type your message here" 
                value={formData.message} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <button type="submit" className="submit-btn">Submit Now</button>
          </form>
        </div>

      </div>
    </div>
  );
}

export { Contactus };