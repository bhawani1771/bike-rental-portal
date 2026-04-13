import React, { useState, useEffect } from "react";
import "./admin.css";

function Orders() {
    const [orderList, setOrderList] = useState([]); 
    const [selectedOrder, setSelectedOrder] = useState(null); 

    async function getOrders() {
        try {
            const res = await fetch("http://localhost:4000/api/orders");
            const data = await res.json();
            setOrderList(data.reverse());
        } catch (err) {
            console.log("Data laane mein error: ", err);
        }
    }


    useEffect(() => { 
        getOrders(); 
    }, []);

    return (
        <div className="mainn">
           
            <div className="admin-header">
                <h2 style={{color : "#001446"}}>Order Management</h2>
                <div className="order-count">Total Orders: <b>{orderList.length}</b></div>
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product Image</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map((order) => (
                        <tr key={order._id}>
                            
                            <td>#{order._id.slice(-5)}</td>
                            
                           
                            <td>
                                <img src={order.products[0]?.image} alt="p" className="mini-img" style={{width:'40px', borderRadius:'4px'}} />
                               
                                {order.products.length > 1 && <small> +{order.products.length - 1} more</small>}
                            </td>

                           
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            
                            <td>₹{order.amount}</td>

                           
                            <td>
                                <span className={`status-badge ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </td>

                          
                            <td>
                                <button className="view-btn" onClick={() => setSelectedOrder(order)}>
                                    Show Detail
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            {selectedOrder && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 style={{color:"#001446"}}>Full Order Details</h3>
                            <button className="close-btn" onClick={() => setSelectedOrder(null)}>×</button>
                        </div>

                        <div className="modal-body">
                            <div className="detail-section">
                                <h4>Customer Information</h4>
                                <p className="detail-text"><strong>Name:</strong> {selectedOrder.uname}</p>
                                <p className="detail-text"><strong>Mobile:</strong> {selectedOrder.umobile}</p>
                                <p className="detail-text"><strong>Full Address:</strong> {selectedOrder.uaddress}, {selectedOrder.landmark}, {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}</p>
                            </div>
                            
                            <hr />

                            <div className="detail-section">
                                <h4>Items Ordered</h4>
                                {selectedOrder.products.map((p, i) => (
                                    <div key={i} className="detail-item">
                                        <img src={p.image} width="50" alt="" />
                                        <div>
                                            <p style={{margin:0, color:"white"}}><strong>{p.title}</strong></p>
                                            <small>Price: ₹{p.price} | Qty: {p.quantity}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr />

                            <div className="detail-section">
                                <p className="detail-text"><strong>Final Amount:</strong> ₹{selectedOrder.amount}</p>
                                <p className="detail-text"><strong>Order Time:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                                <p className="detail-text"><strong>Status:</strong> {selectedOrder.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export { Orders };