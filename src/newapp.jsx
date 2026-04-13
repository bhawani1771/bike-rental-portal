import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "./newcomponents/header";
import { Banner } from "./newcomponents/banner.jsx";
import { Secondbanner } from "./newcomponents/secondbanner.jsx";
import { Card } from "./newcomponents/card.jsx";
import { Sticker } from "./newcomponents/thirdbanner.jsx";
import { Faq } from "./newcomponents/faq.jsx";
import { Review } from "./newcomponents/review.jsx";
import { Footar } from "./newcomponents/footar.jsx";
import { Newabout } from "./newpages/about.jsx";
import {Newblog} from "./newpages/blog.jsx";
import {Contactus} from "./newpages/contactus.jsx";
import { Products } from "./newcomponents/productcard.jsx";
import { Auth } from "./newcomponents/userlogin.jsx";
import { Productdetail } from "./newcomponents/productdetail";
import {OrderForm} from "./newcomponents/orderform"






function Newapp() {

  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Products/>
            <Secondbanner />
            <Card />
            <Sticker />
            <Faq />
            <Review />
          </>
        }
        />


       <Route path="/product-detail/:id" element={<Productdetail/>}/>
       <Route path="/user-management" element={<Auth/>}/>
       <Route path="/blog" element={<Newblog/>}/>
       <Route path="/about" element={<Newabout/>}/>
       <Route path="/FAQ" element={<Faq/>}/>
       <Route path="/contact-us" element={<Contactus/>}/>
       <Route path="/order-create" element={<OrderForm/>}/>


      </Routes>
      <Footar/>
    </Router>

   

  )

}

export { Newapp }