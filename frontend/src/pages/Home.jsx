import React, { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.log("Error loading products:", err.message);
    }
  };

  return (
    <div>
      <h1>Construction Materials</h1>

      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        products.map((p) => (
          <div key={p._id}>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
