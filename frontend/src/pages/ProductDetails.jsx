import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then(res => setProduct(res.data));
  }, []);

  const addToCart = async () => {
    if (!token) return alert("Please login first");

    await axios.post(
      "http://localhost:5000/api/cart/add",
      { productId: product._id, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Added to cart");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="text-green-600 text-xl font-bold mt-3">₹{product.price}</p>

      <button onClick={addToCart}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
