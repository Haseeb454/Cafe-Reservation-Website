import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import bgImage from "/public/Background.jpg";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token
        localStorage.setItem("adminToken", data.token);

        toast.success("Login successful!");
        setFormData({ email: "", password: "" });

        setTimeout(() => {
          navigate("/AdminDashboard");
        }, 1500);
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* ← Back Button */}
      <Link
        to="/"
        className="absolute top-7 left-4 sm:left-3 text-white bg-black/80 hover:bg-black/80 px-4 py-3 rounded-full text-sm font-medium shadow-lg backdrop-blur z-10"
      >
        ← Back to Home
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-md bg-black/50 text-white backdrop-blur-md rounded-3xl shadow-2xl px-6 py-8 sm:px-8 sm:py-10 relative top-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full px-4 py-2 rounded-4xl bg-black-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-4xl bg-black-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-400 text-black font-semibold py-2 rounded-4xl transition duration-300 shadow-lg flex justify-center items-center cursor-pointer"
          >
            {loading ? (
              <span className="animate-pulse text-black">
                Logging in<span className="animate-bounce">...</span>
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
