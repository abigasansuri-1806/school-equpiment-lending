import { useState } from "react";
import axios from "axios";

export default function EquipmentForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    condition: "Good",
    quantity: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/equipment", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <select name="condition" onChange={handleChange}>
        <option value="New">New</option>
        <option value="Good">Good</option>
        <option value="Fair">Fair</option>
        <option value="Poor">Poor</option>
      </select>
      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        onChange={handleChange}
      />
      <button type="submit">Add Equipment</button>
    </form>
  );
}
