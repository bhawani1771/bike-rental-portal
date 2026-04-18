import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import "./adminpanel.css";


function Review() {

    const [allReview, setAllReview] = useState([]);
    const [showForm, setShowForm] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("")



    const apiurl = "https://onn-bike-rental-backend.onrender.com/api/review";

    async function fetchreview() {
        const response = await fetch(apiurl);
        const resdata = await response.json();
        setAllReview(resdata.reverse());
    }

    useEffect(function () {
        fetchreview();
    }, []);


    async function postreview(e) {
        e.preventDefault();

        const reviewInfo = {
            name: name,
            description: description,
        };

        try {
            const response = await fetch(apiurl, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewInfo)
            });
            if (response.ok) {
                toast.success("Reaview submit succesfully");
                fetchreview();
                setShowForm(false);
                setName("");
                setDescription("");
            } else {
                toast.error("Failed to Post Review")
            }
        } catch (err) {
            toast.error("Server problem")
        }
    }




    return (
        <>

            <div className="review-main-container">

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", color: "black" }}>
                    <h1>Inventory Management</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={{ padding: '10px 20px', background: showForm ? 'red' : 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        {showForm ? "Close Form" : "Add Review"}
                    </button>
                </div>


                {showForm && (
                    <div className="review-form">
                        <h2>Add Review</h2>
                        <form onSubmit={postreview}>
                            <input type="text" placeholder="Enter Custmor name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <input type="text" placeholder="Enter Review name" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            <button type="submit" style={{ background: 'orange', padding: '10px', marginTop: '10px', cursor: 'pointer', border: 'none', width: '100%' }}>
                                Save Product
                            </button>
                        </form>
                    </div>
                )}


                <div className="review-container">

                    {allReview.map(function (item, index) {
                        return (
                            <div className="review-card" key={index}>
                                <h1 className="custumor-name">{item.name}</h1>
                                <p>{item.description}</p>
                            </div>
                        )
                    })}

                </div>
            </div>

        </>
    )


}
export { Review }