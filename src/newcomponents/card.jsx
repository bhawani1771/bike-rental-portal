import React from "react";
import "./design.css"
import { FaTag, FaMotorcycle, FaKey, FaMapMarkerAlt } from 'react-icons/fa';

function Card() {
    return (
        <>
            <div className="head-containair">
                <h1 className="why">Why ONN?</h1>
                <p className="cnt2">Better Bikes. Better Prices. Better Experience</p>
                <div className="card-containair">

                    <div className="card-in">
                        <FaTag className="card-icon" />
                        <h3>Lowest Rental Prices</h3>
                        <p>Affordable bikes don't have to come with hidden charges. At ONN, we keep our rental prices low and our billing honest. Starting from ₹119 per day, you get straightforward rates for hourly, daily, or monthly rentals. What you see is what you pay. No surprise fees. No confusing charges.</p>
                    </div>

                    <div className="card-in">
                        <FaMotorcycle className="card-icon" />
                        <h3>Flexible Rental Plans</h3>
                        <p>Rent exactly how you need. Hourly rates for quick errands, daily plans for weekend rides, weekly options to test commutes, or monthly subscriptions for everyday use. One bike rental solution doesn't fit everyone, so we offer plans that work with your lifestyle. Choose what makes sense, switch anytime-no locked-in commitments</p>
                    </div>

                    <div className="card-in">
                        <FaKey className="card-icon" />
                        <h3>No Ownership Worries</h3>
                        <p>Ownership comes with headaches: EMIs, servicing, insurance, registration fees. With ONN, forget all that. We handle maintenance, insurance, and upkeep-you just ride. Pay only for the time you actually use the bike. No ownership stress. Just pure riding freedom without the financial burden.</p>
                    </div>

                    <div className="card-in">
                        <FaMapMarkerAlt className="card-icon" />
                        <h3>Multiple Rental Hubs</h3>
                        <p>Multiple hubs across the city means you're never far from a bike. Stop searching the city for pickup points-we've placed rental stations at all the key locations you actually visit. Pick the hub nearest to you, grab your bike, and ride. That's it. Easy access. Zero hassle. Maximum convenience</p>
                    </div>


                </div>
            </div>
        </>
    )
}
export { Card }