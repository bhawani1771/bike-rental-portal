import React, { useState, useEffect } from "react";
import "./admin.css";

function Product() {
  const [allProducts, setAllProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");  
  const [metaKeywords, setMetaKeywords] = useState("");

  const apiurl = "http://localhost:4000/api/products";

  async function fetchProducts() {
    const response = await fetch(apiurl);
    const data = await response.json();
    setAllProducts(data.reverse()); 
  }

  useEffect(function () {
    fetchProducts();
  }, []);

  async function deleteProduct(id) {
    if (window.confirm("Are your sure to delete this product")) {
      await fetch(apiurl + "/" + id, { method: "DELETE" });
      fetchProducts();
    }
  }

  
  function openEditForm(item) {
    setEditId(item._id);
    setTitle(item.title);
    setBrand(item.brand);
    setPrice(item.price);
    setStock(item.stock);
    setImage(item.image);
    setDesc(item.desc || "");
    
  
    setMetaTitle(item.metaTitle || "");
    setMetaDesc(item.metaDesc || "");
    setMetaKeywords(item.metaKeywords || "");
    
    setShowForm(true);
  }

 
  async function saveProduct() {
    const productObj = {
      title,
      brand,
      price,
      stock,
      image,
      desc,
      metaTitle,  
      metaDesc,
      metaKeywords
    };

    if (editId === null) {
      
      await fetch(apiurl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObj)
      });
      alert("Product with SEO Meta Tags Added!");
    } else {
      
      await fetch(apiurl + "/" + editId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productObj)
      });
      alert("Product & SEO Data Updated!");
    }

    setTitle(""); setBrand(""); setPrice(""); setStock(""); setImage(""); setDesc("");
    setMetaTitle(""); setMetaDesc(""); setMetaKeywords(""); // Meta states bhi khali kari
    setEditId(null);
    setShowForm(false);
    fetchProducts();
  }

  return (
    <div className="product-section">
      <div className="product-header">
        <h2>Inventory Management</h2>
        <button
          className="addpro"
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) {
              setEditId(null); setTitle(""); setBrand(""); setPrice(""); setStock(""); setImage(""); setDesc("");
              setMetaTitle(""); setMetaDesc(""); setMetaKeywords("");
            }
          }}
        >
          {showForm ? "Close Form" : "Add New Product"}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editId ? "Update Product" : "Add New Product"}</h3>
          
         
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
          <div style={{display:'flex', gap:'10px'}}>
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>
          <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
          <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} style={{width:'100%', padding:'8px', marginBottom:'10px'}} />

      
          <div className="seo-section" style={{background: '#f0f4f8', padding: '15px', borderRadius: '8px', marginTop: '10px'}}>
             <h4 style={{margin: '0 0 10px 0', color: '#0056b3'}}>SEO Meta Data (Google Search)</h4>
             
             <input 
                placeholder="Meta Title (Max 60 chars)" 
                value={metaTitle} 
                onChange={(e) => setMetaTitle(e.target.value)} 
             />
             <textarea 
                placeholder="Meta Description (Summary for Google)" 
                value={metaDesc} 
                onChange={(e) => setMetaDesc(e.target.value)} 
                style={{width:'100%', padding:'8px', marginBottom:'10px'}}
             />
             <input 
                placeholder="Meta Keywords (e.g. fashion, shoes, buy online)" 
                value={metaKeywords} 
                onChange={(e) => setMetaKeywords(e.target.value)} 
             />
          </div>

          <button onClick={saveProduct} className="save-btn" style={{marginTop:'15px'}}>
            {editId ? "Update Now" : "Save Product"}
          </button>
        </div>
      )}

      
      <div className="container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map(function (item) {
              return (
                <tr key={item._id}>
                  <td><img src={item.image} alt="" className="table-img" style={{ width: '40px', height:'40px', objectFit:'cover', borderRadius:'4px' }} /></td>
                  <td>
                    {item.title}
                    {item.metaTitle && <br />}
                    {item.metaTitle && <small style={{color:'green', fontSize:'10px'}}>SEO Active ✅</small>}
                  </td>
                  <td>{item.brand}</td>
                  <td>₹{item.price}</td>
                  <td>{item.stock}</td>
                  <td>
                    <button className="edit-icon" onClick={() => openEditForm(item)}>✏️</button>
                    <button className="del-icon" onClick={() => deleteProduct(item._id)}>🗑</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { Product };