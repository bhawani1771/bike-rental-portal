import React, { useEffect, useState } from "react";
import "./design.css";


function Review() {
    const [items, setItems] = useState([]);


    const apiurl = "http://localhost:4000/api/review";

    const getreview = async () => {
        try {
            const review = await fetch(apiurl);
            const dataa = await review.json();
            setItems(dataa);
        } catch (error) {
            console.log("API Errror", error);
        }
    };


    useEffect(() => {
        getreview();
    }, [])


    return (
        <>
            <div className="reaview-container">
                <h3 className="why">What Our Customers Say</h3>
                <p className="better">Real experiences from riders who trust us every day.</p>

                <div className="review-container-in">
                    {items.map((item) => (
                        <div className="review-card" key={item._id}>

                            <p>{item.description}</p>
                            <h1 className="r-name">{item.name}</h1>
                        </div>
                    ))

                    }





                </div>
            </div>

        </>
    )
}
export { Review }