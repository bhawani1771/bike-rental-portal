import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Listings } from "./newadmin/listing";
import {Navbar} from "./newadmin/navbar";
import { Usrinfo } from "./newadmin/userinfo";
import {Review} from "./newadmin/review";
import {AdminLogin} from "./newadmin/adminlogin"
import { Booking } from "./newadmin/booking";




function Newappp() {

const isAdmin = localStorage.getItem("isAdmin");

  return (
    <>
    <Toaster position="top-center" />

    <BrowserRouter>
     
      {isAdmin && <Navbar />}
      
      <Routes>


<Route path="/login" element={<AdminLogin/>}/>
        <Route path="/" element={isAdmin ? (
          <h1 style={{textAlign: 'center', marginTop: '50px', color: 'black'}}>Welcome to Bike Rental! Click on Listing.</h1>
        ):(
          <Navigate to = "/login"/>
        )        } />

        
        <Route path="/bookings" element={isAdmin ? <Booking /> : <Navigate to="/login" />} />
        <Route path="/listing" element={isAdmin ? <Listings /> : <Navigate to="/login" />} />
        <Route path="/review" element={isAdmin ? <Review /> : <Navigate to="/login" />} />
        <Route path="/user-management" element={isAdmin ? <Usrinfo /> : <Navigate to="/login" />} />
        <Route path="/booking" element={isAdmin ? <Booking /> : <Navigate to="/login" />} />
       
      </Routes>
    </BrowserRouter>
    </>
  );
}

export  {Newappp};