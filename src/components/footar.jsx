import React from "react";
import '../components/header.css'

function Footer(){
    return(

<>

<div className="footer">
        <div className="foot">
            <h3>Our us</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas libero deleniti aliquam magni consequatur.
                Repellat corporis iusto placeat earum adipisci vel obcaecati est. Doloremque, commodi.</p>
        </div>

        <div className="foot2">
            <h3>Quick links</h3>
            <ul>
                <li>About boat</li>
                <li>Our Services</li>
                <li>Our Blog</li>
                <li>FAQ's</li>
                <li>COntact Us</li>
            </ul>
        </div>

        <div className="foot3">
            <h3>Recent Post</h3>
            <h4>15th April, 2024</h4>
            <p>Top 5 Famous Technology Trend In 2024</p>


        </div>
        <div className="foot4">
            <h3>Contact Us</h3>
            <p>Email: example@gmail.com</p>
            <p>Phone: +91 9876543210</p>
            <input type="email" className="email" placeholder="Enter Your Email Adress" />
            <br />
            <button>⟶</button>
            <p>T&C apply</p>
        </div>
    </div>




</>

    )
}

export{Footer}