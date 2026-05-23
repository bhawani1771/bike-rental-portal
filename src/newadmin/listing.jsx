import React, { useState, useEffect } from "react";
import "./adminpanel.css";
import toast from "react-hot-toast";

function Listings() {
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [desc, setDesc] = useState("");
  const [kmh, setKmh] = useState("");

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  const [allListing, setAllListing] = useState([]);

  const apiurl = "https://onn-bike-rental-backend.onrender.com/api/listing";

  // GET DATA
  async function fetchListing() {
    try {
      const response = await fetch(apiurl);
      const data = await response.json();
      setAllListing(data.reverse());
    } catch (error) {
      toast.error("Data Load Failed");
    }
  }

  useEffect(() => {
    fetchListing();
  }, []);

  // EDIT
  function handleEdit(item) {
    setIsEdit(true);
    setEditId(item._id);

    // Old + New field support
    setImage(item.image || "");
    setTitle(item.title || item.model || "");
    setBrand(item.brand || "");
    setPrice(item.price || item.rate || "");
    setStock(item.stock || "");
    setDesc(item.desc || "");
    setKmh(item.kmh || item.km || "");

    setMetaTitle(item.metaTitle || item.metatitle || "");
    setMetaDesc(item.metaDesc || item.metadescription || "");
    setMetaKeywords(item.metaKeywords || item.metakeyword || "");

    setShowForm(true);
  }

  // RESET
  function resetForm() {
    setImage("");
    setTitle("");
    setBrand("");
    setPrice("");
    setStock("");
    setDesc("");
    setKmh("");
    setMetaTitle("");
    setMetaDesc("");
    setMetaKeywords("");

    setShowForm(false);
    setIsEdit(false);
    setEditId("");
  }

  // ADD
  async function postData(e) {
    e.preventDefault();

    const newData = {
      image,
      title,
      brand,
      price,
      stock,
      desc,
      kmh,
      metaTitle,
      metaDesc,
      metaKeywords,
    };

    const response = await fetch(apiurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (response.ok) {
      toast.success("Product Added");
      fetchListing();
      resetForm();
    } else {
      toast.error("Add Failed");
    }
  }

  // UPDATE
  async function updateData(e) {
    e.preventDefault();

    const updatedData = {
      image,
      title,
      brand,
      price,
      stock,
      desc,
      kmh,
      metaTitle,
      metaDesc,
      metaKeywords,
    };

    const response = await fetch(`${apiurl}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      toast.success("Updated");
      fetchListing();
      resetForm();
    } else {
      toast.error("Update Failed");
    }
  }

  return (
    <div className="listing-management-container">

      {/* Header */}
      <div className="top-bar">
        <h1 style={{color:"rgb(56, 59, 78)"}}>Inventory Management</h1>

        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          Add Product
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="my-form">

          <div className="form-header">
            <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
<button
  onClick={resetForm}
  style={{
    background: "red",
    color: "white",
    border: "none",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}
>
  X
</button>
          </div>

          <form onSubmit={isEdit ? updateData : postData}>

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="KM"
              value={kmh}
              onChange={(e) => setKmh(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <input
              type="text"
              placeholder="Meta Title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Meta Desc"
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
            />

            <input
              type="text"
              placeholder="Meta Keywords"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
            />

            <button type="submit" className="save-btn">
              {isEdit ? "Update Product" : "Save Product"}
            </button>

          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="listing-table">

          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Price</th>
              <th>KM</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allListing.map((item) => (
              <tr key={item._id}>

                <td>
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      width: "70px",
                      height: "50px",
                      objectFit: "contain"
                    }}
                  />
                </td>

                {/* old + new field support */}
                <td>{item.title || item.model}</td>

                <td>{item.brand}</td>

                <td>₹{item.price || item.rate}</td>

                <td>{item.kmh || item.km}</td>

                <td>{item.stock}</td>

                <td>
                  <button onClick={() => handleEdit(item)}>
                    ✏️
                  </button>

                  <button>
                    🗑️
                  </button>
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