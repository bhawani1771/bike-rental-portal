import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import "./header.css";

function Productdetail() {
  const { productid } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSingleProduct = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/products/${productid}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProduct();

    if (product) {
      document.title = product.metaTitle || product.title;
    }

    return () => {
      document.title = "My E-com Store";
    };
  }, [productid, product]);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading Product...</h2>;

  if (!product) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Product Not Found</h2>
        <button onClick={() => navigate("/")}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div className="product-detail-wrapper">
      <button className="backbtn" onClick={() => navigate(-1)}>← Back</button>

      <img src={product.image} alt={product.title} width="300" />

      <h2>{product.title}</h2>
      <h3 style={{ color: "green" }}>₹ {product.price}</h3>
      <p className="desc">{product.desc}</p>
      <p><b>Brand:</b> {product.brand}</p>
      <p><b>Stock:</b> {product.stock > 0 ? product.stock : "Out of Stock"}</p>

      <button 
        className="backbtnn"
        onClick={() =>
          addItem({
            id: product._id,
            price: product.price,
            title: product.title,
            image: product.image,
          })
        }
      >
        Add to Cart
      </button>
      
      <button className="buynowbtn">Buy Now</button>
    </div>
  );
}

export { Productdetail };