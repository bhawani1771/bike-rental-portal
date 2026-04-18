import React from "react";
import { useState, useEffect } from "react";
import "./adminpanel.css";
import toast from "react-hot-toast";

function Listings() {
    const [showForm, setShowForm] = useState(false);
    
    // Edit mode check karne ke liye state
    const [isEdit, setIsEdit] = useState(false); 
    const [editId, setEditId] = useState(""); // Kis product ko edit karna hai uska ID

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

    const apiurl = "https://onn-bike-rental-backend.onrender.com/api/listing";

    async function fetchListing() {
        const response = await fetch(apiurl);
        const resdata = await response.json();
        setAlllisting(resdata.reverse());
    }

    useEffect(function () {
        fetchListing();
    }, []);

    // EDIT FUNCTION: Jab user Pencil icon dabaye
    function handleEdit(item) {
        setIsEdit(true);
        setEditId(item._id);
        setImage(item.image);
        setModel(item.model);
        setBrand(item.brand);
        setRate(item.rate);
        setKm(item.km);
        setExtracost(item.extracost);
        setStock(item.stock);
        setMetatitle(item.meta?.title || "");
        setMetaDescription(item.meta?.description || "");
        setMetaKeywords(item.meta?.keywords || "");
        setShowForm(true); // Form open karo
    }

    // UPDATE FUNCTION: Jab user Update button dabaye
    async function updateData(e) {
        e.preventDefault();
        const updatedInfo = { image, model, brand, rate, km, stock, extracost, 
                             meta: { title: metatitle, description: metadescription, keywords: metakeyword } };

        try {
            const response = await fetch(`${apiurl}/${editId}`, {
                method: "PUT", // Backend mein PUT route hona chahiye
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedInfo)
            });

            if (response.ok) {
                toast.success("Product Updated!");
                fetchListing();
                resetForm();
            }
        } catch (err) {
            toast.error("Update failed!");
        }
    }

    function resetForm() {
        setShowForm(false);
        setIsEdit(false);
        setImage(""); setModel(""); setBrand(""); setRate(""); setKm(""); 
        setExtracost(""); setStock(""); setMetatitle(""); 
        setMetaDescription(""); setMetaKeywords("");
    }

    async function postData(e) {
        e.preventDefault();
        // ... (Aapka existing postData code yahan waisa hi rahega)
    }

    return (
        <div className="listing-management-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", color: "black" }}>
                <h1>Inventory Management</h1>
                <button onClick={() => { setShowForm(!showForm); setIsEdit(false); }} 
                        style={{ padding: '10px 20px', background: showForm ? 'red' : 'green', color: 'white', border: 'none', borderRadius: '5px' }}>
                    {showForm ? "Close Form" : "Add New Product"}
                </button>
            </div>

            {showForm && (
                <div className="my-form">
                    <h2>{isEdit ? "Edit Product" : "Add New Product"}</h2>
                    {/* Form submit par function change hoga */}
                    <form onSubmit={isEdit ? updateData : postData}>
                        <input type="text" placeholder="Paste Image URL here" value={image} onChange={(e) => setImage(e.target.value)} required />
                        <input type="text" placeholder="Enter model name" value={model} onChange={(e) => setModel(e.target.value)} required />
                        {/* ... baaki inputs wahi rahenge ... */}
                        
                        <button type="submit" style={{ background: 'orange', padding: '10px', width: '100%' }}>
                            {isEdit ? "Update Product" : "Save Product"}
                        </button>
                    </form>
                </div>
            )}

            <div className="listing-in-container">
                <table className="listing-table">
                    {/* ... table header ... */}
                    <tbody>
                        {allListing.map((item) => (
                            <tr key={item._id}>
                                <td><img src={item.image} alt={item.model} style={{ width: "50px", height: "40px" }} /></td>
                                <td>{item.model}</td>
                                <td>{item.brand}</td>
                                <td>{item.rate}</td>
                                <td>{item.km}</td>
                                <td>{item.extracost}p/km</td>
                                <td>{item.stock}</td>
                                <td>
                                    {/* Edit button par handleEdit call hoga */}
                                    <button className="edit-btn" onClick={() => handleEdit(item)}>✏️</button>
                                    <button className="delete-btn"> 🗑 </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export { Listings };