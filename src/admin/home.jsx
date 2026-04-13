import React, { useState, useEffect } from "react";
import "./admin.css";

function Home() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    async function getuser() {
        const myapi = await fetch("http://localhost:4000/api/users");
        const data = await myapi.json();
        if (data) {
            setUsers(data);
        }
    }

    async function product() {
        const myapi = await fetch("http://localhost:4000/api/products");
        const data = await myapi.json();
        if (data) {
            const flatProducts = data.flatMap(item => item.products);
            setProducts(flatProducts);
        }
    }

    async function getOrders() {
        const myapi = await fetch("http://localhost:4000/api/orders");
        const data = await myapi.json();
        if (data) {
            setOrders(data);
        }
    }

    useEffect(function () {
        getuser();
        product();
        getOrders();
    }, []);

    return (
        <>
            <div className="box">
                <div className="boxxin1">
                    <h3>Total Users</h3>
                    <h1>{users.length}</h1>
                </div>

                <div className="boxxin1">
                    <h3>Total Products</h3>
                    <h1>{products.length}</h1>
                </div>

                <div className="boxxin1">
                    <h3>Total Orders</h3>
                    <h1>{orders.length}</h1>
                </div>

                <div className="boxxin1">
                    <h3>Pending Tasks</h3>
                    <h1>0</h1>
                </div>
            </div>
        </>
    );
}

export { Home };