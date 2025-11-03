import { useEffect, useState } from "react";
import axios from "axios";

export default function EquipmentList() {
  const [equipment, setEquipment] = useState([]);

  const fetchEquipment = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/equipment", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEquipment(res.data);
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  return (
    <div>
      <h1>Equipment List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Condition</th>
            <th>Quantity</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((eq) => (
            <tr key={eq._id}>
              <td>{eq.name}</td>
              <td>{eq.category}</td>
              <td>{eq.condition}</td>
              <td>{eq.quantity}</td>
              <td>{eq.available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
