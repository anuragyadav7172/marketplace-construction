// src/components/ProductCard.jsx
import { useNavigate } from "react-router-dom";
import "../css/product.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="card shadow-sm product-card p-3">
      <h5 className="fw-bold">{product.name}</h5>
      <p className="text-success fw-semibold">₹{product.price}</p>

      <button
        className="btn btn-primary btn-sm mt-2"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
