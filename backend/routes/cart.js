const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
} = require("../controllers/cartController");

const router = express.Router();

// Protected routes
router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update", protect, updateQuantity);
router.delete("/remove/:productId", protect, removeItem);

module.exports = router;
