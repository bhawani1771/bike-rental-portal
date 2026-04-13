import React, { useState } from "react";
// import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import { Headerr } from "./components/head";
import { Footer } from "./components/footar";
import { Homee } from "./pages/home";
import { About } from "./pages/about";
import { Service } from "./pages/service";
import { Productdetail } from "./components/productdetail";
import { Login } from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [searchText, setSearchText] = useState("");

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <CartProvider>
      <BrowserRouter>
      <>
  {/* existing code */}
  <ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    theme="dark"
  />
</>

        {user && (
          <Headerr
            setSearchText={setSearchText}
            setUser={setUser}
          />
        )}

        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
          />

          <Route
            path="/"
            element={
              user ? (
                <Homee searchText={searchText} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/product/:productid"
            element={
              user ? <Productdetail /> : <Navigate to="/login" />
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
        </Routes>

        {user && <Footer />}
      </BrowserRouter>
    </CartProvider>
  


);
}

export {App};
