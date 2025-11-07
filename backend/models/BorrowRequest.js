// models/BorrowRequest.js
import mongoose from "mongoose";

const borrowRequestSchema = new mongoose.Schema({
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  staff: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // staff issuing or approving
  warden: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // warden approving
  quantity: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ["Pending", "Approved", "Rejected", "Returned"], default: "Pending" },
  requestDate: { type: Date, default: Date.now },
  issueDate: { type: Date },      
  returnDate: { type: Date },     
  dueDate: { type: Date },        // auto-calculate based on lending rules
  remarks: { type: String }       
});

export default mongoose.model("BorrowRequest", borrowRequestSchema);
