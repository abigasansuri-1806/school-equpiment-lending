import BorrowRequest from "../models/BorrowRequest.js";
import Equipment from "../models/Equipment.js";

// STUDENT: Create a borrow request
export const createRequest = async (req, res) => {
  try {
    const { equipmentId, quantity, dueDate, remarks } = req.body;

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });

    if (quantity > equipment.available)
      return res.status(400).json({ message: "Requested quantity exceeds available" });

    const request = new BorrowRequest({
      equipment: equipmentId,
      student: req.user._id,
      quantity,
      dueDate,
      remarks
    });

    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// STUDENT: Get own requests
export const getMyRequests = async (req, res) => {
  try {
    const requests = await BorrowRequest.find({ student: req.user._id })
      .populate("equipment", "name category");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// WARDEN: Get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await BorrowRequest.find()
      .populate("equipment", "name category")
      .populate("student", "name email");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// WARDEN: Approve or Reject
export const approveRequest = async (req, res) => {
  try {
    const { requestId, approve } = req.body;

    const request = await BorrowRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.status !== "Pending") return res.status(400).json({ message: "Already processed" });

    if (approve) {
      request.status = "Approved";
      request.warden = req.user._id;
      // request.dueDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
      request.dueDate = new Date(Date.now() + 1 * 60 * 1000); // 1 minute ahead
      // Reduce available quantity
      const equipment = await Equipment.findById(request.equipment);
      if (request.quantity > equipment.available)
        return res.status(400).json({ message: "Insufficient quantity" });
      equipment.available -= request.quantity;
      await equipment.save();
    } else {
      request.status = "Rejected";
      request.warden = req.user._id;
    }

    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// STAFF: Mark as Returned
export const markReturned = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await BorrowRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.status !== "Approved") return res.status(400).json({ message: "Cannot return" });

    request.status = "Returned";
    request.returnDate = new Date();

    // Increase available quantity
    const equipment = await Equipment.findById(request.equipment);
    equipment.available += request.quantity;
    await equipment.save();

    await request.save();
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// STAFF: Get all approved requests
export const getApprovedRequests = async (req, res) => {
  try {
    const requests = await BorrowRequest.find({ status: "Approved" })
      .populate("equipment", "name category")
      .populate("student", "name email");
    
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

