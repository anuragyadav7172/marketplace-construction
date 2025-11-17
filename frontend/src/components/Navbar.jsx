// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/navbar.css";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate(); // ✔ MUST be outside any condition

  // Prevent crash if context fails
  if (!auth) {
    console.error("❌ AuthContext is undefined — check AuthProvider wrapping.");
    return null;
  }

  const { user, cartCount, logout } = auth;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span
        className="navbar-brand fw-bold"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        MarketPlace
      </span>

      <div className="ms-auto d-flex align-items-center gap-4">

        {/* Cart */}
        <div
          className="position-relative"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/cart")}
        >
          <span className="fs-4">🛒</span>
          {cartCount > 0 && (
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
              {cartCount}
            </span>
          )}
        </div>

        {/* Auth Buttons */}
        {!user ? (
          <>
            <Link className="btn btn-outline-light btn-sm" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-light btn-sm" to="/register">
              Register
            </Link>
          </>
        ) : (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
