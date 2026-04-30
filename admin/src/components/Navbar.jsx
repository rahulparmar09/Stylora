import { LogOut, LogIn, Shield, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminSalon } from "../context/adminContext";

const Navbar = () => {
  const { token, setToken, toast } = adminSalon();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    toast.success("Admin Logged out");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 px-8 flex items-center justify-between bg-[#121212]/80 backdrop-blur-lg shadow-md z-50">
      {/* LEFT SIDE */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img
          src="/src/assets/logo.png"
          alt="logo"
          className="h-8"
        />

        {/* ADMIN BADGE */}
        <div className="flex items-center gap-1 bg-[#d9c7a0]/20 text-[#d9c7a0] px-3 py-1 rounded-full text-xs font-semibold">
          <User size={14} />
          Admin
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div>
        {!token ? (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-[#d9c7a0] text-black px-4 py-2 rounded-full font-semibold hover:opacity-90"
          >
            <LogIn size={16} />
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full hover:bg-red-500/20"
          >
            <LogOut size={16} />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;