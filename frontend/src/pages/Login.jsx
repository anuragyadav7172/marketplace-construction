// src/pages/Login.jsx
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      const { user, token } = res.data;

      login(user, token);
      toast.success("Logged in");
      navigate("/");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="card p-4 shadow-sm">
        <h3 className="mb-3 fw-bold">Login</h3>

        <form onSubmit={handleSubmit}>
          <input 
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input 
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
