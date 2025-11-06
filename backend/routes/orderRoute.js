import express from "express";
import orderModel from "../models/orderModel.js";

const router = express.Router();

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// Delete single order
router.delete("/:id", async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

// Clear all orders
router.delete("/clear", async (req, res) => {
  try {
    await orderModel.deleteMany({});
    res.json({ message: "All orders cleared" });
  } catch (err) {
    console.error("Error clearing all orders:", err);
    res.status(500).json({ message: "Failed to clear all orders" });
  }
});

export default router; // ✅ Important line
