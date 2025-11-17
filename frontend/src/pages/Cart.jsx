// src/pages/Cart.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCart, updateCart, removeItem } from "../api/cartApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/cart.css";

const Cart = () => {
  const { token, refreshCart } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  // Fetch cart on page load
  useEffect(() => {
    if (!token) return navigate("/login");

    getCart(token)
      .then((res) => setCart(res.data.items))
      .catch(() => toast.error("Failed to load cart"));
  }, [token]);

  // Increase quantity
  const increaseQty = async (item) => {
    try {
      await updateCart(token, item.product._id, item.quantity + 1);
      refreshCart();
      reloadCart();
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  // Decrease quantity
  const decreaseQty = async (item) => {
    if (item.quantity === 1) return;

    try {
      await updateCart(token, item.product._id, item.quantity - 1);
      refreshCart();
      reloadCart();
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  // Remove item
  const deleteItem = async (item) => {
    try {
      await removeItem(token, item.product._id);
      refreshCart();
      reloadCart();
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  // Reload cart
  const reloadCart = () => {
    getCart(token).then((res) => setCart(res.data.items));
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="list-group mb-3">
            {cart.map((item) => (
              <div
                className="list-group-item d-flex justify-content-between align-items-center"
                key={item.product._id}
              >
                <div>
                  <h5 className="fw-bold">{item.product.name}</h5>
                  <p className="text-success fw-semibold">
                    ₹{item.product.price}
                  </p>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => decreaseQty(item)}
                  >
                    -
                  </button>

                  <span className="fw-bold">{item.quantity}</span>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => increaseQty(item)}
                  >
                    +
                  </button>

                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => deleteItem(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-3 shadow-sm">
            <h4 className="fw-bold">Total: ₹{total}</h4>
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
