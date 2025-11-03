import Equipment from "../models/Equipment.js";

// Get all equipment
export const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new equipment
export const addEquipment = async (req, res) => {
  try {
    const { name, category, condition, quantity } = req.body;
    const newEquipment = new Equipment({
      name,
      category,
      condition,
      quantity,
      available: quantity
    });
    const saved = await newEquipment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update equipment
export const updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Equipment.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete equipment
export const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    await Equipment.findByIdAndDelete(id);
    res.json({ message: "Equipment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
