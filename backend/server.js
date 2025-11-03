import express from "express";
import dotenv from "dotenv";
import cors from "cors"; //Enables cross-origin requests (important for frontend-backend communication)
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("API is running successfully!");
});

// Auth routes
app.use("/api/auth", authRoutes);
// Equipment Routes
app.use("/api/equipment", equipmentRoutes);
//Borrow Routes
app.use("/api/borrow", borrowRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
