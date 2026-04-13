import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { toast } from 'react-toastify'; 
import "./header.css";

function CartSidebar({ isOpen, onClose }) {
  const { items, updateItemQuantity, removeItem, cartTotal, totalItems, emptyCart } = useCart();


  
  const [showForm, setShowForm] = useState(false);
  const [uname, setUname] = useState("");
  const [umobile, setUmobile] = useState("");
  const [uaddress, setUaddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");


  let shippingCharge = totalItems > 0 ? (totalItems === 1 ? 99 : totalItems * 49) : 0;
  const grandTotal = cartTotal + shippingCharge;

  function confirmOrder() {



    if (!uname || !umobile || !uaddress || !city || !state || !pincode) {
      toast.warn(" Please fill all required fields!");
      return;


    }

    const orderData = {
    uname: uname,
    umobile: umobile,
    uaddress: uaddress,
    city: city,
    state: state,
    pincode: pincode,
    landmark: landmark,
    amount: grandTotal, 
    products: items     
  };

    
   fetch("http://localhost:4000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  })
  .then((res)=> res.json())
  .then((data)=>{
    toast.success("Order Placed succesfully ...✅");
    emptyCart();
    setShowForm(false);
    onClose();
  })
  .catch((err)=>{
    console.log("error" , err);
    toast.error("Something went wrong ! Please check detail and try again later")
  })
}

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-box">


        <div className="cart-header">
          <h3>{showForm ? "Delivery Details" : `My Cart (${totalItems})`}</h3>
          <button className="close-cart" onClick={() => { setShowForm(false); onClose(); }}>✖</button>
        </div>



        <div className="cart-main-content">
          {!showForm ? (
            items.length === 0 ? <p className="empty-msg">Cart is empty</p> : 
            items.map((item) => (
            
                 <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.title} className="cart-prod-img" />
                <div className="cart-item-info">
                       <h4>{item.title}</h4>
                      <p className="price-text">₹ {item.price}</p>
                    <div className="qty-btns">
                           <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                                 <span className="qty-count">{item.quantity}</span>
                         <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                          <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                      </div>
              </div>
               ))
          ) : (
                    <div className="address-form-container">
                       <h4 className="form-title">Delivery Details</h4>
                    <div className="input-row">
                            <input type="text" placeholder="Full Name" onChange={(e) => setUname(e.target.value)} />
                     <input type="number" placeholder="Mobile" onChange={(e) => setUmobile(e.target.value)} />
                             </div>
               <input type="text" placeholder="House / Building / Street" onChange={(e) => setUaddress(e.target.value)} style={{width:"93%", marginBottom: "10px"}} />
                      <div className="input-row">
                                    <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                           <input type="text" placeholder="State" onChange={(e) => setState(e.target.value)} />
                           </div>
                         <div className="input-row" style={{marginTop: "10px"}}>
                                                 <input type="number" placeholder="Pincode" onChange={(e) => setPincode(e.target.value)} />
                      <input type="text" placeholder="Landmark" onChange={(e) => setLandmark(e.target.value)} />
                           </div>
            </div>
          )}
        </div>

     
        {items.length > 0 && (
          <div className="cart-footer">
            {!showForm ? (
              <div className="price-summary">
                  <div className="price-row"><span>Price:</span> <span>₹{cartTotal}</span></div>
                           <div className="price-row"><span>Shipping:</span> <span>₹{shippingCharge}</span></div>
                         <div className="total-row"><span>Total:</span> <span>₹{grandTotal}</span></div>
                                <button className="buy-now-btn" onClick={() => setShowForm(true)}>BUY NOW</button>
              </div>
            ) : (
              <div className="form-summary">
                              <div className="final-bill-info">To Pay: <strong>₹{grandTotal}</strong></div>
                        <button className="confirm-btn" onClick={confirmOrder}>PLACE ORDER NOW</button>
                         <button className="back-link" onClick={() => setShowForm(false)}>← Edit Cart</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { CartSidebar };