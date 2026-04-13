import React from "react";
import "./design.css";




function Banner() {

 const city = [
  {branch :"Jhotwara",valueee :"jhotwar"},
  {branch :"Mansarovar",valueee :"mansarovar"},
  {branch :"Malviyanagar",valueee :"malviyanagar"},
  {branch :"Sindhi camp",valueee :"sindhi camp"},
  {branch :"Railway Staition",valueee :"railway staition"},
  {branch :"Chandpol",valueee :"chandpol"},
];



    return (
        <>
            <div className="box">
                <div className="box-in1">
                    <h1>Rent A Bike & Explore The City</h1>
           <p>Affordable, Quick and Hassle-free Bike Rentals</p>
                </div>

                <div className="box-in2">
                    <div className="booking-inps">
                        <div className="location-contionair">
                            <label>Select Location & Branch</label>
                            <select className="info-input">
                                    <option value="">Select City</option>
                                  {city.map((item , index)=>(
                                  <option key={index} value={item.valueee}>ONN bikes , {item.branch}</option>
                                  ))}
                                </select>
                        </div>

                         <div className="info-input">
                            <label>Start Date & Time</label>
                            <input type="datetime-local" className="start-time-input" />
                         </div>

                         <div className="info-input">
                            <label>End Date & Time </label>
                            <input type="datetime-local" className="end-time-input" />
                         </div>
                         <button className="find-btn">Find Bike</button>
                    </div>
                </div>
            </div>

            <h3 className="content">ONN Bikes - India’s Best Bike & Scooty Rental Service</h3>
        </>
    )
}
export {Banner}