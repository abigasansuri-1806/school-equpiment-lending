import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EquipmentCard from "../components/EquipmentCard";

export default function EquipmentDashboard() {
  const [equipment, setEquipment] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // fetch all equipment
  const fetchEquipment = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/equipment", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEquipment(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  // filter logic
  const filtered = equipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });
 
    // Handle role-based navigation
  const handleNavigate = () => {
    if (role === "student") navigate("/student");
    else if (role === "warden") navigate("/warden");
    else if (role === "staff") navigate("/staff");
  };

  // Label for button
  const getRoleButtonLabel = () => {
    if (role === "student") return "Go to Borrow Page";
    if (role === "warden") return "Manage Equipment Requests";
    if (role === "staff") return "View Assigned Tasks";
    return "Go to Dashboard";
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Equipment Dashboard</h1>
        <button
          onClick={handleNavigate}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            margin: "20px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {getRoleButtonLabel()}
        </button>
      </div>

      {/* Search and Filter */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option>All</option>
          <option>Sports</option>
          <option>Lab</option>
          <option>Music</option>
          <option>Project</option>
        </select>
      </div>

      {/* Equipment List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
        {filtered.map((item) => (
          <EquipmentCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
