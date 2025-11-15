const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// User routes
router.post("/place", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);

// Admin routes
router.get("/all", protect, adminOnly, getAllOrders);
router.put("/status/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;
