import { useState, useEffect } from "react";
import axios from "axios";

export default function StudentBorrow() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [quantity, setQuantity] = useState(1);

  const token = localStorage.getItem("token");

  const fetchEquipment = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/equipment", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEquipmentList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/borrow/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/borrow",
        { equipmentId: selectedEquipment, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Error submitting request");
    }
  };

  useEffect(() => {
    fetchEquipment();
    fetchRequests();
  }, []);

  // 🧮 Helper to check if item is overdue
  const isOverdue = (dueDate, status) => {
    if (status !== "Approved" || !dueDate) return false;
    const now = new Date();
    return new Date(dueDate) < now;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Request Equipment</h1>

      {/* Request Form */}
      <form onSubmit={submitRequest} style={{ marginBottom: "30px" }}>
        <select
          onChange={(e) => setSelectedEquipment(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        >
          <option value="">Select Equipment</option>
          {equipmentList.map((eq) => (
            <option key={eq._id} value={eq._id}>
              {eq.name} (Available: {eq.available})
            </option>
          ))}
        </select>

        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(e.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
          required
        />

        <button type="submit" style={{ padding: "8px 16px" }}>
          Request
        </button>
      </form>

      {/* Request List */}
      <h2>My Requests</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {requests.map((r) => (
          <li
            key={r._id}
            style={{
              backgroundColor: isOverdue(r.dueDate, r.status)
                ? "#ffe6e6"
                : "#f5f5f5",
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "10px",
              marginBottom: "10px",
              color :"black"
            }}
          >
            <strong>{r.equipment.name}</strong> — {r.status}
            {r.dueDate && (
              <>
                {" "}
                | Due: {new Date(r.dueDate).toLocaleDateString()}
              </>
            )}
            {isOverdue(r.dueDate, r.status) && (
              <span style={{ color: "red", marginLeft: "10px" }}>
                ⚠️ Overdue
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
