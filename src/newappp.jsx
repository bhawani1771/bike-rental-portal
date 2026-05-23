import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";

import { Listings } from "./newadmin/listing";
import { Navbar } from "./newadmin/navbar";
import { Usrinfo } from "./newadmin/userinfo";
import { Review } from "./newadmin/review";
import { AdminLogin } from "./newadmin/adminlogin";
import { Booking } from "./newadmin/booking";

function Newappp() {
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <>
      <Toaster position="top-center" />

      {/* Navbar only after login */}
      {isAdmin && <Navbar />}

      <Routes>

        {/* Login Page */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Admin Home */}
        <Route
          path="/admin/"
          element={
            isAdmin ? (
              <h1
                style={{
                  textAlign: "center",
                  marginTop: "50px",
                  color: "black",
                }}
              >
                Welcome to Admin Panel
              </h1>
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/admin//listing"
          element={
            isAdmin ? <Listings /> : <Navigate to="/admin/login" />
          }
        />

        <Route
          path="/admin//review"
          element={
            isAdmin ? <Review /> : <Navigate to="/admin/login" />
          }
        />

        <Route
          path="/admin//user-management"
          element={
            isAdmin ? <Usrinfo /> : <Navigate to="/admin/login" />
          }
        />

        <Route
          path="/admin//booking"
          element={
            isAdmin ? <Booking /> : <Navigate to="/admin/login" />
          }
        />

        <Route
          path="/admin//bookings"
          element={
            isAdmin ? <Booking /> : <Navigate to="/admin/login" />
          }
        />

      </Routes>
    </>
  );
}

export { Newappp };