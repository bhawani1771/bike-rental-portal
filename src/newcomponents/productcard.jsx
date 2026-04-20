import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./design.css";

function Products() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(3);

  const API_URL = "https://onn-bike-rental-backend.onrender.com/api/listing";

  const createSlug = (text) => {
    return text.toLowerCase().replace(/ /g, "-");
  };

  const getProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.log("API Error:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  return (
    <div className="product-page">
      <h1 className="title">Rent Your Dream Bike</h1>

      <div className="product-grid">
        {items.slice(0, visible).map((item) => (
          <div key={item._id} className="card-box">
            
            <p className="brand-name">{item.brand}</p>




            <Link
              to={`/product-detail/${createSlug(item.model)}`}
              state={{ bike: item }}
            >
              <img src={item.image} alt="bike" className="p-img" />
            </Link>

            <div className="content">




              <Link
                to={`/product-detail/${createSlug(item.model)}`}
                state={{ bike: item }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3>{item.model}</h3>
              </Link>

              <div className="price-info">
                <span className="amt">
                  ₹{item.rate}
                  <p className="show-bold-and-green">/Hours</p>
                </span>

                <p className="show-in-small-text">
                  {item.km}km
                  <span className="show-in-green"> included</span>
                </p>

                <span className="stock-tag">
                  {item.stock > 0 ? "Stock Available" : "Stock Out"}
                </span>

                <p>
                  ₹{item.extracost}
                  <span className="extra-charge"> Above km charge</span>
                </p>
              </div>




              <Link
                to={`/product-detail/${createSlug(item.model)}`}
                state={{ bike: item }}
              >
                <button className="rent-btn">Book Now</button>
              </Link>

            </div>
          </div>
        ))}
      </div>




      {visible < items.length && (
        <div className="view-more-container">
          <button className="view-more-btn" onClick={showMoreItems}>
            View More
          </button>
        </div>
      )}
    </div>
  );
}

export { Products };