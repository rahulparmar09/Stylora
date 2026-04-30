import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSalon } from "../context/Saloncontext";


const Forgetpass = () => {
  const navigate = useNavigate();
  const { backendUrl, toast } = useSalon();

  const [step, setStep] = useState(1); // 1 = send otp, 2 = reset password

  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: ""
  });

  const [msg, setMsg] = useState("");

  // SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/send-otp`,
        { email: form.email }
      );

      setMsg(res.data.msg);
      setStep(2);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error");
    }
  };

  // RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/reset-password`,
        form
      );

      setMsg(res.data.msg);

      toast.success("Password Changed Successfully");

      setForm({
        email: "",
        otp: "",
        password: ""
      });

      setStep(1);
      navigate("/register");

    } catch (err) {
      setMsg(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#121212] text-white relative overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute w-96 h-96 bg-[#d9c7a0]/10 blur-[120px] rounded-full -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -bottom-20 -right-20" />

      {/* Card */}
      <div className="relative z-10 w-96 backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">

        <h2 className="text-2xl text-center font-serif uppercase text-[#d9c7a0] leading-tight">
          Forgot Password
        </h2>



        <p className="text-center text-sm text-gray-400 mb-6">
          {step === 1
            ? "Enter your email to receive OTP"
            : "Verify OTP & reset password"}
        </p>

        {/* MESSAGE */}
        {msg && (
          <p className="text-center text-sm mb-4 text-green-400">
            {msg}
          </p>
        )}

        {/* STEP 1 - EMAIL */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">

            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:border-[#d9c7a0] outline-none transition"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#d9c7a0] text-black font-semibold p-3 rounded-lg hover:opacity-90 transition"
            >
              Send OTP
            </button>

          </form>
        )}

        {/* STEP 2 - OTP + PASSWORD */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">

            <input
              type="text"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={(e) =>
                setForm({ ...form, otp: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:border-[#d9c7a0] outline-none transition"
              required
            />

            <input
              type="password"
              placeholder="New Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:border-[#d9c7a0] outline-none transition"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#d9c7a0] text-black font-semibold p-3 rounded-lg hover:opacity-90 transition"
            >
              Reset Password
            </button>

          </form>
        )}

        {/* BACK TO LOGIN */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Remember password?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#d9c7a0] cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Forgetpass;