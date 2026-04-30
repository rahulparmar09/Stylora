import { Home, Scissors, Info, Phone, Menu, X, User, UserCircle, Calendar, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSalon } from "../context/Saloncontext";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);

    const { backendUrl, token, setToken, user, toast } = useSalon();
    const navigate = useNavigate();

    const navItems = [
        { path: "/", label: "Home", icon: <Home size={18} /> },
        { path: "/services", label: "Services", icon: <Scissors size={18} /> },
        { path: "/about", label: "About", icon: <Info size={18} /> },
        { path: "/contact", label: "Contact", icon: <Phone size={18} /> },
    ];


    const handleLogout = () => {
        setToken(null);
        setDropOpen(false);
        navigate("/");
        toast.success("Logout successful");
    };


    return (
        <nav className="fixed top-0 left-0 w-full px-10 py-5 flex items-center justify-between shadow-md z-50 bg-[#121212]/80 backdrop-blur-lg">

            {/* LOGO */}
            <img
                src="https://stylora.dropletthemes.com/wp-content/themes/stylora/assets/images/logo/logo.png"
                alt="logo"
                className="h-8 cursor-pointer"
                onClick={() => navigate("/")}
            />

            {/* DESKTOP NAV */}
            <ul className="hidden md:flex gap-10 absolute left-1/2 transform -translate-x-1/2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-2 cursor-pointer transition
                            ${isActive
                                ? "text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#d9c7a0]"
                                : "text-gray-400 hover:text-white hover:scale-105"
                            }`
                        }
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}
            </ul>

            {/* RIGHT SIDE */}
            <div className="hidden md:flex items-center gap-4 relative">

                {!token ? (
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-[#d9c7a0] text-black px-5 py-2 rounded-full font-semibold hover:opacity-90"
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative">

                        {/* USER BUTTON */}
                        <div
                            onClick={() => setDropOpen(!dropOpen)}
                            className="flex items-center gap-3 cursor-pointer px-3 py-1 rounded-full hover:bg-[#121212] bg-white/10 transition"
                        >
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt="profile"
                                    className="w-9 h-9 rounded-full object-cover border border-[#d9c7a0] shrink-0"
                                />
                            ) : (
                                <div className="w-9 h-9 flex items-center justify-center rounded-full border border-[#d9c7a0] shrink-0">
                                    <User className="w-5 h-5 text-[000]" />
                                </div>
                            )}

                            <span className="text-sm text-white font-medium truncate max-w-30">
                                {user?.username || "User"}
                            </span>
                        </div>

                        {/* DROPDOWN */}
                        {dropOpen && (
                            <div className="absolute right-0 mt-3 w-52 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">

                                <button
                                    onClick={() => {
                                        navigate("/profile");
                                        setDropOpen(false);
                                    }}
                                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-300 hover:bg-white/10"
                                >
                                    <UserCircle size={16} />
                                    Profile
                                </button>

                                <button
                                    onClick={() => {
                                        navigate("/appointments");
                                        setDropOpen(false);
                                    }}
                                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-300 hover:bg-white/10"
                                >
                                    <Calendar size={16} />
                                    My Appointments
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>

                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* MOBILE MENU ICON */}
            <div className="md:hidden z-50">
                {open ? (
                    <X onClick={() => setOpen(false)} />
                ) : (
                    <Menu onClick={() => setOpen(true)} />
                )}
            </div>

            {/* MOBILE MENU */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-[#121212] flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>

                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            `text-lg flex items-center gap-3 ${isActive ? "text-white" : "text-gray-400"
                            }`
                        }
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}

                {!token ? (
                    <button
                        onClick={() => {
                            navigate("/register");
                            setOpen(false);
                        }}
                        className="bg-[#d9c7a0] text-black px-6 py-2 rounded-full font-semibold"
                    >
                        Login
                    </button>
                ) : (
                    <div className="flex flex-col items-center gap-4">

                        <div className="flex items-center gap-2">
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    className="w-10 h-10 rounded-full"
                                />
                            ) : (
                                <User className="w-8 h-8 text-[#d9c7a0]" />
                            )}

                            <span className="text-white">
                                {user?.username}
                            </span>
                        </div>

                        <button onClick={() => { navigate("/profile"); setOpen(false); }}>
                            Profile
                        </button>

                        <button onClick={() => { navigate("/appointments"); setOpen(false); }}>
                            My Appointments
                        </button>

                        <button onClick={() => { handleLogout(); setOpen(false); }} className="text-red-400">
                            Logout
                        </button>

                    </div>
                )}

            </div>
        </nav>
    );
}