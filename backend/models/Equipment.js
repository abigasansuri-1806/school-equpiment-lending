import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, enum: ["New", "Good", "Fair", "Poor"], default: "Good" },
  quantity: { type: Number, required: true, min: 0 },
  available: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Equipment", equipmentSchema);
