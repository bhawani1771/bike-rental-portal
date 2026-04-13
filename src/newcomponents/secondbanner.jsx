import React from "react";
import "./design.css"

function Secondbanner() {
    return (
        <>
            <h1 className="cnt">Our Services</h1>
            <p className="cnt2">Your Bike, Your Way - Bike Rentals with No Complications</p>
            <div className="main-containar">
                <div className="main-in">
                    <div className="main-in-in">
                        <h1>Daily Rental</h1>
                        <p>Quick Pickup</p>
                        <p>Flexible Duration</p>
                        <p>24/7 Support</p>
                        <button className="rentnow-btn">Rent Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export { Secondbanner }