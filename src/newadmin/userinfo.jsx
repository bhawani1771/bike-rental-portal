import React from "react";
import { useState, useEffect } from "react";
import "./adminpanel.css";

function Usrinfo() {
    const [allUser, setAllUser] = useState([]);

    const apiurl = "https://onn-bike-rental-backend.onrender.com/api/bikeusers";

    async function fetchUser() {

        const response = await fetch(apiurl);
        const resdata = await response.json();
        setAllUser(resdata.reverse());

    }

    useEffect(function () {
        fetchUser();
    }, []);

    return (
        <>

            <div className="listing-management-container">
                <div className="listing-in-container">
                    <table className="listing-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Email</th>
                                <th>Number</th>
                            </tr>
                        </thead>

                        <tbody>

                            {allUser.map(function (items, index) {
                                return (
                                    <tr key={index}>
                                        <td>{items.username}</td>
                                        <td>{items.password}</td>
                                        <td>{items.email}</td>
                                        <td>{items.number}</td>
                                        
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export { Usrinfo };
