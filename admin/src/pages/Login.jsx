import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { adminSalon } from "../context/adminContext";
import { Title } from "../components/Title";

const Login = () => {
  const { backendUrl, setToken, toast } = adminSalon();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/login`,
        formData
      );

      if (data.success) {
        toast.success("Admin Login Successful");

        setToken(data.token);

        // redirect to admin dashboard
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-96 h-96 bg-[#d9c7a0]/10 blur-[120px] rounded-full -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -bottom-20 -right-20" />

      {/* Card */}
      <div className="relative z-10 w-105 backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl">

        <Title subtitle="Admin Panel" title="Admin Login" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/10 border border-white/10 focus:border-[#d9c7a0] outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/10 border border-white/10 focus:border-[#d9c7a0] outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#d9c7a0] text-black font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;