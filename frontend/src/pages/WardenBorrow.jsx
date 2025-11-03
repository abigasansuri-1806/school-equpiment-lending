import { useState, useEffect } from "react";
import axios from "axios";

export default function WardenBorrow() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/api/borrow", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRequests(res.data);
  };

  const approveRequest = async (requestId, approve) => {
    await axios.put(
      "http://localhost:5000/api/borrow/approve",
      { requestId, approve },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchRequests();
  };

  useEffect(() => { fetchRequests(); }, []);

  return (
    <div>
      <h1>All Borrow Requests</h1>
      <ul>
        {requests.map(r => (
          <li key={r._id}>
            {r.equipment.name} requested by {r.student.name} - {r.status}
            {r.status === "Pending" && (
              <>
                <button onClick={() => approveRequest(r._id,true)}>Approve</button>
                <button onClick={() => approveRequest(r._id,false)}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
