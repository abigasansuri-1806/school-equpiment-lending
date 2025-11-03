import React from "react";
import axios from "axios";

export default function EquipmentCard({ item }) {
  const handleBorrow = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/borrow",
        { equipmentId: item._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Request sent!");
    } catch (err) {
      console.error(err);
      alert("Error sending request");
    }
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "15px",
      background: "#f9f9f9",
      color: "black"
    }}>
      <h3>{item.name}</h3>
      <p><b>Category:</b> {item.category}</p>
      <p><b>Condition:</b> {item.condition}</p>
      <p><b>Available:</b> {item.available}/{item.quantity}</p>
    </div>
  );
}
