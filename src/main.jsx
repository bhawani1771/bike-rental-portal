import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "react-use-cart";

import { Newapp } from "./newapp.jsx";
import { Newappp } from "./newappp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <CartProvider>

        <BrowserRouter>

          <Routes>

            {/* Website */}
            <Route path="/*" element={<Newapp />} />

            {/* Admin Panel */}
            <Route path="/admin/*" element={<Newappp />} />
            

          </Routes>

        </BrowserRouter>

      </CartProvider>
    </HelmetProvider>
  </StrictMode>
);