// src/pages/Registration.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import {NavLink, useNavigate} from 'react-router-dom';
import { useAuth } from "../Context/ContextAPI";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Navigation
  const navigate = useNavigate();
  //COntextApi is here
  const {storeToken} = useAuth();
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");
      
      storeToken(data.token);
      setSuccess("Registration successful! Please login.");
      setFormData({ name: "", email: "", password: "" });
      // Redirect after 3 seconds
      setTimeout(() => {
      navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-[80vh] bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        className="w-full max-w-md bg-pink-100 dark:bg-gray-800 rounded-2xl shadow-lg p-8 rounded-tl-[100px] rounded-br-[100px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Create Account 🚀
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Join us to explore amazing books
        </p>

        {/* Error / Success */}
        {error && <p className="text-center text-red-500 text-sm mt-3">{error}</p>}
        {success && <p className="text-center text-green-500 text-sm mt-3">{success}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} autoComplete="off" className="mt-8 space-y-5">
          {/* Name Input */}
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-400 text-xl" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
              bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
              bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-gray-400 text-xl" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
              bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 
              focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold 
            rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <NavLink to="/login" className="text-indigo-600 hover:underline">
            Login
          </NavLink>
        </p>
      </motion.div>
    </section>
  );
};

export default Registration;
