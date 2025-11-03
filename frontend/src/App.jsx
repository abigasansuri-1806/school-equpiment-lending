import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentBorrow from "./pages/StudentBorrow";
import WardenBorrow from "./pages/WardenBorrow";
import StaffBorrow from "./pages/StaffBorrow";
import ProtectedRoute from "./components/ProtectedRoute";
import EquipmentDashboard from "./pages/EquipmentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentBorrow />
            </ProtectedRoute>
          }
        />

        {/* Warden Routes */}
        <Route
          path="/warden"
          element={
            <ProtectedRoute role="warden">
              <WardenBorrow />
            </ProtectedRoute>
          }
        />

        {/* Staff Routes */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute role="staff">
              <StaffBorrow />
            </ProtectedRoute>
          }
        />

        {/* Equiment Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <EquipmentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
