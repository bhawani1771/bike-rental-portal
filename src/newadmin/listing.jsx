import React from "react";
import { useState, useEffect } from "react";
import "./adminpanel.css";
import toast from "react-hot-toast";

function Listings() {
    const [showForm, setShowForm] = useState(false);

    const [image, setImage] = useState("");
    const [allListing, setAlllisting] = useState([]);
    const [model, setModel] = useState("");
    const [brand, setBrand] = useState("");
    const [rate, setRate] = useState("");
    const [km, setKm] = useState("");
    const [stock, setStock] = useState("");
    const [extracost, setExtracost] = useState("");
    const [metatitle, setMetatitle] = useState("");
    const [metadescription, setMetaDescription] = useState("");
    const [metakeyword, setMetaKeywords] = useState("");

    const apiurl = "http://localhost:4000/api/listing";

    async function fetchListing() {
        const response = await fetch(apiurl);
        const resdata = await response.json();
        setAlllisting(resdata.reverse());
    }

    useEffect(function () {
        fetchListing();
    }, []);

    async function postData(e) {
        e.preventDefault();

        const productInfo = {
            image: image,
            model: model,
            brand: brand,
            rate: rate,
            km: km,
            stock: stock,
            extracost: extracost,
            meta: {
                title: metatitle,
                description: metadescription,
                keywords: metakeyword
            }
        };
        
        try {
            const response = await fetch(apiurl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productInfo)
            });

            if (response.ok) {
                toast.success("Product Added Successfully");
                fetchListing();
                setShowForm(false); 
               
                setImage(""); setModel(""); setBrand(""); setRate(""); setKm(""); 
                setExtracost(""); setStock(""); setMetatitle(""); 
                setMetaDescription(""); setMetaKeywords("");
            } else {
                toast.error("Failed to add product");
            }
        } catch (err) {
            toast.error("Server problem!");
        }
    }

    return (
        <>
        
            <div className="listing-management-container">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" , color: "black"}}>
                    <h1>Inventory Management</h1>
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        style={{ padding: '10px 20px', background: showForm ? 'red' : 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        {showForm ? "Close Form" : "Add New Product"}
                    </button>
                </div>

              
                {showForm && (
                    <div className="my-form">
                        <h2>Add New Product</h2>
                        <form onSubmit={postData}>
                            <input type="text" placeholder="Paste Image URL here" value={image} onChange={(e) => setImage(e.target.value)} required />
                            <input type="text" placeholder="Enter model name" value={model} onChange={(e) => setModel(e.target.value)} required />
                            <input type="text" placeholder="Enter Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                            <input type="number" placeholder="Enter per hour Rate" value={rate} onChange={(e) => setRate(e.target.value)} required />
                            <input type="number" placeholder="Enter KM included" value={km} onChange={(e) => setKm(e.target.value)} required />
                            <input type="number" placeholder="Enter extra cost" value={extracost} onChange={(e) => setExtracost(e.target.value)} required />
                            <input type="number" placeholder="Enter Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
                            <input type="text" placeholder="Enter Meta Title" value={metatitle} onChange={(e) => setMetatitle(e.target.value)} required />
                            <input type="text" placeholder="Enter Meta description" value={metadescription} onChange={(e) => setMetaDescription(e.target.value)} required />
                            <input type="text" placeholder="Enter Search keywords" value={metakeyword} onChange={(e) => setMetaKeywords(e.target.value)} required />
                            <button type="submit" style={{ background: 'orange', padding: '10px', marginTop: '10px', cursor: 'pointer', border: 'none', width: '100%' }}>
                                Save Product
                            </button>
                        </form>
                    </div>
                )}

                <div className="listing-in-container">
                    <table className="listing-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Model</th>
                                <th>Brand</th>
                                <th>Rate</th>
                                <th>KM included</th>
                                <th>Extracost</th>
                                <th>Available</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allListing.map(function (item) {
                                return (
                                    <tr key={item._id}>
                                        <td><img src={item.image} alt={item.model} style={{ width: "50px", height: "40px", objectFit: "cover", borderRadius: "5px" }} /></td>
                                        <td>{item.model}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.rate}</td>
                                        <td>{item.km}</td>
                                        <td>{item.extracost}p/km</td>
                                        <td>{item.stock}</td>
                                        <td>
                                            <button className="edit-btn" >✏️</button>
                                            <button className="delete-btn"> 🗑 </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export { Listings };