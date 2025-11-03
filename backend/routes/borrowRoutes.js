import express from "express";
import {
  createRequest,
  getMyRequests,
  getAllRequests,
  approveRequest,
  markReturned,
  getApprovedRequests
} from "../controllers/borrowController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Student routes
router.post("/", protect, authorizeRoles("student"), createRequest);
router.get("/my", protect, authorizeRoles("student"), getMyRequests);

// Warden routes
router.get("/", protect, authorizeRoles("warden"), getAllRequests);
router.put("/approve", protect, authorizeRoles("warden"), approveRequest);

// Staff routes
router.get("/approved", protect, authorizeRoles("staff"), getApprovedRequests);
router.put("/return", protect, authorizeRoles("staff"), markReturned);

export default router;
