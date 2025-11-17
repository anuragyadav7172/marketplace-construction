// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import "../css/home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Construction Materials</h2>

      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-4 col-lg-3" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
