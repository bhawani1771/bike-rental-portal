import React from 'react';
import './css.css';

function Service() {
  const services = [
    { title: "Fast Delivery", desc: "fastest and safest delivery across India.", icon: "🚚" },
    { title: "Quality Check", desc: "Every product goes through a 5-level quality check before being shipped.", icon: "✅" },
    { title: "24/7 Support", desc: "Our team is always ready to help you.", icon: "📞" },
    { title: "Secure Payment", desc: "100% safe and encrypted payments with all banks.", icon: "🔒" }
  ];

  return (
    <div className="service-container">
      <h2 className="service-title">Our Premium Services</h2>
      <div className="service-grid">
        {services.map((ser, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{ser.icon}</div>
            <h3>{ser.title}</h3>
            <p>{ser.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Service };