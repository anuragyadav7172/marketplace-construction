import { useState } from "react";
import { registerUser } from "../api/authApi";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      alert(res.data.message);
    } catch (error) {
      alert("Error creating account");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input className="border w-full p-2 mb-3"
          type="text" name="name" placeholder="Full Name" onChange={handleChange} />
        <input className="border w-full p-2 mb-3"
          type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input className="border w-full p-2 mb-3"
          type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
