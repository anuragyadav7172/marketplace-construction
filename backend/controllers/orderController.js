const Cart = require("../models/Cart");
const Order = require("../models/Order");

// Place Order
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const { address, city, phone, pincode } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: userId,
      items: cart.items,
      shippingAddress: { address, city, phone, pincode },
      totalAmount,
      paymentMethod: "COD",
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get User Orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin: Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin: Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
