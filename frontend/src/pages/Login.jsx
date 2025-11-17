import { useState, useContext } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.token);
      alert("Login successful");
      window.location.href = "/";
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="border w-full p-2 mb-3"
          type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input className="border w-full p-2 mb-3"
          type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
