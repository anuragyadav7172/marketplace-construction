// src/pages/Register.jsx
import { useState, useContext } from "react";
import { registerUser, loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Register user
      await registerUser(form);

      toast.success("Account created successfully!");

      // 2️⃣ Auto-login after registration
      const res = await loginUser({
        email: form.email,
        password: form.password,
      });

      const { user, token } = res.data;

      login(user, token);

      toast.success("Logged in automatically");
      
      // 3️⃣ Redirect to home
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="card p-4 shadow-sm">
        <h3 className="mb-3 fw-bold">Create Account</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
