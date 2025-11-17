import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/productApi";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token, refreshCart } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then((res) => setProduct(res.data));
  }, [id]);

  const addToCart = async () => {
    if (!token) {
      toast.error("Please login first");
      return navigate("/login");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      refreshCart();
      toast.success("Added to cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  if (!product) return <p className="container mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="fw-bold">{product.name}</h2>

        <p className="text-muted mt-2">{product.description}</p>

        <h4 className="text-success fw-bold mt-3">
          ₹{product.price}
        </h4>

        <button 
          onClick={addToCart} 
          className="btn btn-success mt-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
