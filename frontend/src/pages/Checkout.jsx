// src/pages/Checkout.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCart } from "../api/cartApi";
import { createOrder } from "../api/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/checkout.css";

const Checkout = () => {
  const { token, refreshCart } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (!token) return navigate("/login");

    getCart(token)
      .then((res) => setCart(res.data.items))
      .catch(() => toast.error("Failed to load cart"));
  }, [token]);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!shipping.fullName || !shipping.address || !shipping.phone) {
      return toast.error("Please fill all shipping details");
    }

    try {
      await createOrder(token, {
        items: cart,
        total,
        shippingDetails: shipping,
      });

      toast.success("Order placed successfully!");

      refreshCart(); // clears cart count

      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  };

  if (cart.length === 0)
    return (
      <div className="container mt-4">
        <h3>Your cart is empty</h3>
      </div>
    );

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Checkout</h2>

      <div className="row">
        {/* Shipping Section */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h4 className="fw-bold mb-3">Shipping Details</h4>

            <input
              className="form-control mb-3"
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              type="text"
              name="address"
              placeholder="Full Address"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h4 className="fw-bold mb-3">Order Summary</h4>

            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  key={item.product._id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <strong>₹{item.product.price * item.quantity}</strong>
                </li>
              ))}
            </ul>

            <h4 className="fw-bold">Total: ₹{total}</h4>

            <button className="btn btn-primary w-100 mt-3" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
