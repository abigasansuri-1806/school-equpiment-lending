import express from "express";
import {
  getAllEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment
} from "../controllers/equipmentController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC FOR LOGGED-IN USERS: all roles can view equipment
router.get("/", protect, getAllEquipment);

// warden-only routes
router.post("/", protect, authorizeRoles("warden"), addEquipment);
router.put("/:id", protect, authorizeRoles("warden"), updateEquipment);
router.delete("/:id", protect, authorizeRoles("warden"), deleteEquipment);

export default router;
