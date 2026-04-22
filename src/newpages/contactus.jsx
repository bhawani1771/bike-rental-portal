import React, { useState } from "react";
import "./page.css";

function Contactus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      setSuccess("");
    }
  };

  return (
    <div className="contact-container">
      
      {/* Left Side */}
      <div className="contact-info">
        <h2>Contact Info</h2>

        <div className="info-box">
          <h4>Address</h4>
          <p>Jaipur, Rajasthan, India</p>
        </div>

        <div className="info-box">
          <h4>Email</h4>
          <p>support@example.com</p>
        </div>

        <div className="info-box">
          <h4>Phone</h4>
          <p>+91 9876543210</p>
        </div>

        <p className="info-desc">
          Feel free to contact us anytime. We respond quickly.
        </p>
      </div>





      <div className="contact-form">
        <h2>Send Message</h2>

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && <span className="error">{errors.subject}</span>}
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>

          <button className="btn">Send Message</button>

          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </div>
  );
}

export  {Contactus};