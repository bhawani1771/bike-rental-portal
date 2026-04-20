import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./design.css";

function Productdetail() {

  const createSlug = (text) => {
  return text.toLowerCase().replace(/ /g, "-");
};

  const navigate = useNavigate();
  const location = useLocation();




  const bike = location.state?.bike;

  const [moreBikes, setMoreBikes] = useState([]);

  


  const goTobooking = () => {
    navigate("/order-create", { state: { bikeDetails: bike } });
  };





  const getMoreBikes = async () => {
    try {
      const res = await fetch("https://onn-bike-rental-backend.onrender.com/api/listing");
      const data = await res.json();

      const filtered = data.filter((item) => item._id !== bike._id);

      setMoreBikes(filtered.slice(0, 3));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (bike) {
      getMoreBikes();
    }
  }, [bike]);

  if (!bike) {
    return <h2 className="loader">No Data Found</h2>;
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



          <div className="price-box" style={{color:"wheat" , backgroundColor:"black"}}>
            ₹{bike.rate} <small>/ Hours</small>
          </div>

          <div className="extra-info">

            <p><b>Included KM:</b> {bike.km} km</p>

            <p><b>Extra KM Charge:</b> ₹{bike.extracost}</p>

            <p>
              <b>Stock:</b>{" "}
              {bike.stock > 0 ? "Available" : "Out of Stock"}
            </p>

            <p><b>Location:</b> Sardarshahar</p>

          </div>



          <button className="detail-book-btn" onClick={goTobooking}>
            Book This Ride Now
          </button>

        </div>

      </div>




      <div className="more-bikes-section">

        <h2>Explore More Bikes</h2>

        <div className="product-grid">
          {moreBikes.map((item) => (
            <div key={item._id} className="card-box">

              <p className="brand-name">{item.brand}</p>

              <Link
                to={`/product-detail/${createSlug(item.model)}`}
                state={{ bike: item }}
              >
                <img src={item.image} alt="" className="p-img" />
              </Link>

              <h4>{item.model}</h4>

              <p>₹{item.rate}</p>

              <Link
                to={`/product-detail/${item.model}`}
                state={{ bike: item }}
              >
                <button className="rent-btn">View</button>
              </Link>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export { Productdetail };