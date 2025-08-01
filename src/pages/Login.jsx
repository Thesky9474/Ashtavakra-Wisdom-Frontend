import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import backend from "../utils/backend";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import BackgroundLayout from "../components/BackgroundLayout";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await backend.post("/auth/login", form);
      login(res.data.token, res.data.user);
      navigate("/chatbot");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <BackgroundLayout>
      <div className="min-h-screen flex items-center justify-center px-4">
        {/* ✨ UPDATED: Applied new card style and animation */}
        <form
          onSubmit={handleSubmit}
          className="bg-cream/50 p-8 rounded-lg border border-yellow-800/10 w-full max-w-sm space-y-4 fade-in-card"
        >
          {/* ✨ UPDATED: Themed heading */}
          <h2 className="font-lora text-2xl font-bold text-center text-charcoal">
            Welcome Back
          </h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* ✨ UPDATED: Themed input fields */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-transparent border border-charcoal/20 px-3 py-2 rounded-lg focus:ring-1 focus:ring-saffron focus:border-saffron transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-transparent border border-charcoal/20 px-3 py-2 rounded-lg focus:ring-1 focus:ring-saffron focus:border-saffron transition"
            required
          />

          {/* ✨ UPDATED: Themed button */}
          <button
            type="submit"
            className="w-full bg-saffron text-white py-2 rounded-lg hover:bg-saffron/90 transition"
          >
            Login
          </button>

          <p className="text-sm text-center text-charcoal/80 pt-2">
            Don't have an account?{" "}
            {/* Use Link component for better navigation */}
            <Link to="/register" className="font-medium text-saffron hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </BackgroundLayout>
  );
};

export default Login;