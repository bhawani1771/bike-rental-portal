import React, { useState, useEffect } from "react";
import "./admin.css";

function User() {
    const [userdata, setuserdata] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);




    const [uname, setUname] = useState("");
    const [uemail, setUemail] = useState("");
    const [upass, setUpass] = useState(""); 
    const [umobile, setUmobile] = useState("");
    const [uage, setUage] = useState("");
    const [ucity, setUcity] = useState("");
    const [urole, setUrole] = useState("User");





    const apiurl = "http://localhost:4000/api/users";



    async function getuser() {
        try {
            const myapi = await fetch(apiurl);
            const data = await myapi.json();
            setuserdata(data);
        } catch (error) {
            console.error("Data fetch error:", error);
        }
    }

    useEffect(function () {
        getuser();
    }, []);

    async function deleteUser(id) {
        if (window.confirm("Do you really want to delete this user?")) {
            const response = await fetch(`${apiurl}/${id}`, { method: "DELETE" });
            if (response.ok) await getuser();
        }
    }

    function openEditForm(item) {
        setEditId(item._id);
        setUname(item.name);
        setUemail(item.email);
        setUpass(item.password || ""); 
        setUmobile(item.phone);
        setUage(item.age || "");
        setUcity(item.city || "");
        setUrole(item.role || "User");
        setShowForm(true);
    }

    async function saveUser() {
        if (!uname || !uemail || !upass) {
            alert("Name, Email and Password are required!");
            return;
        }

        let entry = {
            name: uname,
            email: uemail,
            password: upass,
            phone: umobile,
            age: uage,
            city: ucity,
            role: urole
        };

        try {
            const url = editId ? `${apiurl}/${editId}` : apiurl;
            const method = editId ? "PUT" : "POST";
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(entry)
            });

            if (response.ok) {
                alert(editId ? "User Updated!" : "User Added!");
                setEditId(null);
                setUname(""); setUemail(""); setUpass(""); setUmobile(""); setUage(""); setUcity(""); setUrole("User");
                setShowForm(false);
                await getuser();
            }
        } catch (error) {
            alert("Connection error! Server check karein.");
        }
    }

    return (
        <div className="mainn">
            <div className="header-section">
                <h2>User Management</h2>
                <button onClick={() => { setShowForm(!showForm); setEditId(null); }} className="add-btn">
                    {showForm ? "Close Form" : "Add New User"}
                </button>
            </div>

            {showForm && (
                <div className="form-container">
                    <h3>{editId ? "Edit User Info" : "Add New User"}</h3>
                    <input type="text" placeholder="Full Name" value={uname} onChange={(e) => setUname(e.target.value)} />
                    <input type="email" placeholder="Email" value={uemail} onChange={(e) => setUemail(e.target.value)} />
                    <input type="text" placeholder="Password" value={upass} onChange={(e) => setUpass(e.target.value)} />
                    <input type="text" placeholder="Phone" value={umobile} onChange={(e) => setUmobile(e.target.value)} />
                    
                    <select value={urole} onChange={(e) => setUrole(e.target.value)} className="role-select">
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="sub-admin">Sub-Admin</option>
                    </select>

                    <input type="number" placeholder="Age" value={uage} onChange={(e) => setUage(e.target.value)} />
                    <input type="text" placeholder="City" value={ucity} onChange={(e) => setUcity(e.target.value)} />

                    <button onClick={saveUser} className="save-btn">{editId ? "Update Data" : "Save Data"}</button>
                </div>
            )}

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userdata.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td style={{ color: '#986b09',}}>{item.password}</td> 
                            <td className={`role-badge ${item.role}`}>{item.role || "User"}</td>
                            <td>{item.city}</td>
                            <td>
                                

<button onClick={() => openEditForm(item)} style={{ padding: "2px 6px", fontSize: "11px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "3px", marginRight: "4px", cursor: "pointer" }}>✏️</button>
<button onClick={() => deleteUser(item._id)} style={{ padding: "2px 6px", fontSize: "11px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}> 🗑 </button>

                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export { User };