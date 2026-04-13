import React, { useEffect, useState } from "react";
import { Banner } from "../components/banner";
import { Cards } from "../components/card";
import "../components/header.css";
function Homee({ searchText }) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      setUser(currentUser);
      setShowWelcome(true);

      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 2500);

      return () => clearTimeout(timer); 
    }
  }, []);

  return (
    <>
 
      {showWelcome && user && (
        <div className="welcome-modal-overlay">
          <div className="welcome-modal">
            <h1>Welcome, {user.username}!</h1>
            <p>Glad to see you back. Explore your favorite products!</p>
          </div>
        </div>
      )}

      <Banner />
      <Cards searchText={searchText} />



    </>
  );
}

export { Homee };
