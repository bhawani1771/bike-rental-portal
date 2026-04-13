import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

function Cards(props) {
  const [products, setProducts] = useState([]); 
  const { addItem } = useCart();

  async function getProducts() {
    const response = await fetch("http://localhost:4000/api/products");
    const data = await response.json();
    setProducts(data);
  }

  useEffect(function () {
    getProducts();
  }, []);

  return (
    <div className="main-catainer">
      <h2 className="op">Our Products</h2>

      <div className="card-container">
        {products.map(function (item) {
      
          if (item.title.toLowerCase().includes(props.searchText.toLowerCase())) {
            return (
              <div className="card" key={item._id}>
                <Link
                  to={"/product/" + item._id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img src={item.image} alt={item.title} />
                  <h3>{item.title}</h3>
                  <strong>₹{item.price}</strong>
                <strong>Stock:<i>{item.stock}</i></strong>  
                </Link>

                <button
                  className="backbtnn"
                  onClick={function () {
                    addItem({ ...item, id: item._id });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            );
          } else {
            return null; 
          }
        })}
      </div>
    </div>
  );
}

export { Cards };