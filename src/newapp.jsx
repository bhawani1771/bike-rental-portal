import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./newcomponents/header";
import { Banner } from "./newcomponents/banner.jsx";
import { Secondbanner } from "./newcomponents/secondbanner.jsx";
import { Card } from "./newcomponents/card.jsx";
import { Sticker } from "./newcomponents/thirdbanner.jsx";
import { Faq } from "./newcomponents/faq.jsx";
import { Review } from "./newcomponents/review.jsx";
import { Footar } from "./newcomponents/footar.jsx";

import { Newabout } from "./newpages/about.jsx";
import { Newblog } from "./newpages/blog.jsx";
import { Contactus } from "./newpages/contactus.jsx";

import { Products } from "./newcomponents/productcard.jsx";
import { Auth } from "./newcomponents/userlogin.jsx";
import { Productdetail } from "./newcomponents/productdetail.jsx";
import { OrderForm } from "./newcomponents/orderform.jsx";
import { ScrollToTop } from "./newcomponents/ScrollToTop.jsx";

function Newapp() {
  return (
    <>
      <ScrollToTop />

      <Header />

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Products />
              <Secondbanner />
              <Card />
              <Sticker />
              <Faq />
              <Review />
            </>
          }
        />

        {/* Other Pages */}
        <Route path="/product-detail/:id" element={<Productdetail />} />
        <Route path="/user-management" element={<Auth />} />
        <Route path="/blog" element={<Newblog />} />
        <Route path="/about" element={<Newabout />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/order-create" element={<OrderForm />} />

      </Routes>

      <Footar />
    </>
  );
}

export { Newapp };