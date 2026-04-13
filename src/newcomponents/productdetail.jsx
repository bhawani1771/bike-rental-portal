import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./design.css";
import { OrderForm } from "./orderform"; 

function Productdetail() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
   const navigate = useNavigate();


const goTobooking = () =>{
  navigate("/order-create" , {state: {bikeDetails : bike}});
}


  const getSingleProduct = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/listing/${id}`);
      const data = await res.json();
      setBike(data);
    } catch (error) {
      console.log("Something Went Wrong", error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  if (!bike) {
    return <h2 className="loader">Loading.....</h2>;
  }

  return (
    <div className="product-detail-page">
      <div className="detail-wrapper">
        
        <div className="image-section">
          <img src={bike.image} alt={bike.model} className="detail-img" />
        </div>



        <div className="info-section">
          <p className="brand-name-detail">{bike.brand}</p>
          <h1>{bike.model}</h1>
          
          <div className="price-box">
            <span className="price-amt">₹{bike.rate}</span>
            <small> / 3 Hours Included</small>
          </div>

          <div className="extra-info">
            <p><b>Limit:</b> {bike.km} km covered in package</p>
            <p><b>Extra KM Charge:</b> ₹{bike.extracost} per kilometer</p>
            <p><b>Availability:</b> Sardarshahar (Main Hub)</p>
            <p><b>Stock:</b> {bike.stock > 0 ? "Available" : "Out of Stock"}</p>
          </div>

         

          {/* Purane button ki ab zaroorat nahi kyunki Form mein apna button hai */}
    <button className="detail-book-btn" onClick={goTobooking}>Book This Ride Now</button>
        </div>

      </div>
    </div>
  );
}

export { Productdetail };