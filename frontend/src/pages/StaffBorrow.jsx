import { useState, useEffect } from "react";
import axios from "axios";

export default function StaffBorrow() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/api/borrow/approved", {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Staff sees only approved requests
    setRequests(res.data.filter(r => r.status === "Approved"));
  };

  const markReturned = async (requestId) => {
    await axios.put(
      "http://localhost:5000/api/borrow/return",
      { requestId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchRequests();
  };

  useEffect(() => { fetchRequests(); }, []);

  return (
    <div>
      <h1>Approved Borrow Requests</h1>
      <ul>
        {requests.map(r => (
          <li key={r._id}>
            {r.equipment.name} - {r.student.name} 
            <button onClick={()=>markReturned(r._id)}>Mark Returned</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
