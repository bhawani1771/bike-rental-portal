import React, { useState } from "react";
import imaggee from '../assets/images/earbuds.jpg';
import imaggee1 from '../assets/images/earbuds2.jpg';
import imaggee2 from '../assets/images/headphone 2.webp';
import imaggee3 from '../assets/images/headphone3.jpg';
import imaggee4 from '../assets/images/headphone4.jpg';


function Tab() {
  const [img, setImage] = useState("");

  return (
    <>
    <style>
        {`
          .hyper {
            width: 80px;
            height: 60px;
            margin: 10px;
            border-radius: 5px;
            border: 2px solid #ff004f;
            cursor: pointer;
            transition: transform 0.3s ease, border-color 0.3s ease;
          }
          .hyper:hover {
            transform: scale(1.1);
            border-color: #007bff;
          }
        `}
      </style>

      <div className="tab" style={{ textAlign: "center" }}>
        <div
          id="menu"
          style={{
            width: "50%",
            height: "300px",
            margin: "50px auto",
            backgroundColor: "lightgray",
           
          }}
        >
          
          {img && <img src={img} alt="selected" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
        </div>

       
        <button onClick={() => setImage(imaggee)}>
          <img src={imaggee}  className="hyper" />
        </button>
        <button onClick={() => setImage(imaggee1)}>
          <img src={imaggee1}  className="hyper" />
        </button>
        <button onClick={() => setImage(imaggee2)}>
          <img src={imaggee2} className="hyper"  />
        </button>
        <button onClick={() => setImage(imaggee3)}>
          <img src={imaggee3}  className="hyper" />
        </button>
        <button onClick={() => setImage(imaggee4)}>
          <img src={imaggee4}  className="hyper" />
        </button>
        
      </div>
    </>
  );
}



export {Tab};
