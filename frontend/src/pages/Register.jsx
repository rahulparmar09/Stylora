import React, { useState } from "react";
import axios from "axios";
import { useSalon } from "../context/Saloncontext";
import { Title } from "../components/Title";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { backendUrl, setToken, toast } = useSalon();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isLogin
      ? `${backendUrl}/api/user/login`
      : `${backendUrl}/api/user/register`;

    try {
      const { data } = await axios.post(
        url,
        isLogin
          ? {
            email: formData.email,
            password: formData.password,
          }
          : formData
      );

      if (data.success) {
        toast.success(isLogin ? "Login Success" : "Register Success");

        setToken(data.token);

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
    <div className="min-h-[85vh] flex items-center justify-center bg-[#121212] text-white relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-100 h-100 bg-[#d9c7a0]/10 blur-[120px] rounded-full -top-25 -left-25" />
      <div className="absolute w-100 h-100 bg-blue-500/10 blur-[100px] rounded-full -bottom-25 -right-25" />

      {/* Card */}
      <div className="relative z-10 w-100 backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl">

        <Title
          subtitle={isLogin ? "Welcome Back" : "Join Us"}
          title={isLogin ? "Login" : "Register"}
        />

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="p-3 rounded-lg bg-white/10 border border-white/10 focus:border-[#d9c7a0] outline-none transition"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
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

          {isLogin && (

            <button onClick={() => navigate("/forget")} className="text-[#d9c7a0] flex justify-start cursor-pointer pl- text-sm font-normal hover:underline" >Forget Password</button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt- bg-[#d9c7a0] text-black font-semibold py-3 rounded-lg hover:opacity-90 transition-all duration-300 tracking-wide disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : isLogin
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center mt-6 text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-[#d9c7a0] cursor-pointer hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;