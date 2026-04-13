import React from "react";
import "./design.css"
import { FaUserCheck, FaDownload, FaMotorcycle, FaAward, FaMapMarkerAlt } from 'react-icons/fa';
import img1 from "../assets/images/chaipoint.webp"
import img2 from "../assets/images/ola.png"
import img3 from "../assets/images/faasas.png"
import img4 from "../assets/images/uber.png"
import img5 from "../assets/images/Bewakoof.webp"
import img6 from "../assets/images/ani.webp"
import img7 from "../assets/images/busi.webp"
import img8 from "../assets/images/bw.webp"
import img9 from "../assets/images/thenews.webp"
import img0 from "../assets/images/vvcircle.webp"



function Sticker() {
    return (
        <>
            <div className="main-sticker-containair">
                <h3 className="cntt">Our Achievements</h3>
                <div className="sticker-cnt">
                    <div className="stc">
                        <FaUserCheck className="orange-iconn"/>
                        <p className="icon-desc">200k+ Happy Riders</p>
                    </div>

                    <div className="stc">
                        <FaDownload className="orange-iconn" />
                        <p className="icon-desc">1M+ Downloads</p>
                    </div>


                    <div className="stc">
                        <FaMotorcycle className="orange-iconn" />
                        <p className="icon-desc">5k+ Top Notch Bikes</p>
                    </div>

                    <div className="stc">
                        <FaAward className="orange-iconn" />
                        <p className="icon-desc">2M+ Rides</p>
                    </div>


                    <div className="stc">
                        <FaMapMarkerAlt className="orange-iconn" />
                        <p className="icon-desc">20+ Cities</p>
                    </div>

                </div>

                <h3 className="cntt">Our Clients</h3>
                <div className="sticker-cnt">
                 <img src={img1} alt="gerve" className="stc-img"/>
                 <img src={img2} alt="gerve" className="stc-img"/>
                 <img src={img3} alt="gerve" className="stc-img"/>
                 <img src={img4} alt="gerve" className="stc-img"/>
                 <img src={img5} alt="gerve" className="stc-img"/>
                </div>

                <h3 className="cntt">Featured On</h3>
                <div className="sticker-cnt">
                 <img src={img6} alt="gerve" className="stc-img"/>
                 <img src={img7} alt="gerve" className="stc-img"/>
                 <img src={img8} alt="gerve" className="stc-img"/>
                 <img src={img9} alt="gerve" className="stc-img"/>
                 <img src={img0} alt="gerve" className="stc-img"/>
                </div>


            </div>
        </>
    )
}
export { Sticker }