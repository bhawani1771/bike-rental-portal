import React from "react";
import "./design.css";
import imgg from "../assets/images/logo.png"
import imgg2 from "../assets/images/ximg.svg"
import imgg3 from "../assets/images/facebook.svg"
import imgg4 from "../assets/images/instagram.svg"
import imgg5 from "../assets/images/linkedin.svg"
import imgg6 from "../assets/images/playstoreimg.webp"
import imgg7 from "../assets/images/appstore.webp"



function Footar() {
    return (
        <>

            <div className="footar-container">
                <div className="footer-in">
                    <div className="container-in">
                        <h3 className="heading">Working Hours</h3>
                        <span className="sub-heading">Monday-Friday:</span>
                        <p className="time">9am to 8pm</p>

                        <span className="sub-heading">Saturday:</span>
                        <p className="time">9am to 8pm</p>

                        <span className="sub-heading">Sunday:</span>
                        <p className="time">9am to 8pm</p>
                    </div>

                    <div className="container-in">
                        <h3 className="heading">Our Service At</h3>
                        <ul>
                            <li>Bike for rent in Jhotwara</li>
                            <li>Bike for rent in Mansarovar</li>
                            <li>Bike for rent in Malviyanagar</li>
                            <li>Bike for rent in Sindhi camp</li>
                            <li>Bike for rent in Railway Staition</li>
                            <li>Bike for rent in Chandpol</li>
                           
                        </ul>

                    </div>

                    <div className="container-in">
                        <h3 className="heading">Head Office</h3>
                        <span className="sub-heading">Location</span>
                        <p className="time">ONN Bikes Rental. Hira path, mansarovar 302016</p>
                        <span className="sub-heading">Join us:</span>
                        <p className="time">onnnbikesthefreedom@gmail.com</p>


                    </div>

                    <div className="container-in">
                        <img src={imgg} alt="logoimge" />
                        <p className="time">ONN Bikes redefines how you rent. Hourly, daily, weekly, or monthly choose what fits your life. Plus, we offer long-term leasing for businesses managing last-mile delivery. Flexible bike rentals for every need, every rider, every budget.</p>
                    </div>
                </div>


                <div className="footer-in2">
                    <h5>Follow Us</h5>
                    <div className="social-media-icon">
                        <img src={imgg5} alt="icon" />
                        <img src={imgg2} alt="icon" />
                        <img src={imgg3} alt="icon" />
                        <img src={imgg4} alt="icon" />
                    </div>

                    <div className="play-app">
                        <img src={imgg6} alt="playstore" />
                        <img src={imgg7} alt="appstore" />
                    </div>

                </div>

            </div>
        </>
    )
}


export { Footar }