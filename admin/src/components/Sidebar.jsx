import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    PlusCircle,
    List,
    CalendarDays
} from "lucide-react";

const Sidebar = () => {
    const menuItems = [
        {
            path: "/",
            label: "Dashboard",
            icon: <LayoutDashboard size={18} />
        },
        {
            path: "/add-service",
            label: "Add Service",
            icon: <PlusCircle size={18} />
        },
        {
            path: "/view-service",
            label: "View Services",
            icon: <List size={18} />
        },
        {
            path: "/appointment",
            label: "Appointments",
            icon: <CalendarDays size={18} />
        }
    ];

    return (
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#0f0f0f] border-r border-white/10 px-4 py-6">
            {/* MENU */}
            <div className="flex flex-col gap-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all
                                 ${isActive
                                ? "bg-[#d9c7a0] text-black font-semibold shadow-md"
                                : "text-gray-400 hover:bg-white/10 hover:text-white"
                            }`
                        }
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;