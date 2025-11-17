import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Construction Materials</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className="text-green-600 font-bold">₹{p.price}</p>

            <Link to={`/product/${p._id}`}
              className="block mt-2 bg-blue-600 text-white px-4 py-2 rounded text-center">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
