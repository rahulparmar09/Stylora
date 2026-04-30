import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Admincontext = createContext(null);

export const AdminProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    const backendUrl = import.meta.env.VITE_BACKEND_URL;


    // token save/remove
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (token) {
        }
    }, [token]);

    return (
            <Admincontext.Provider
                value={{
                    backendUrl,
                    token,
                    setToken,
                    toast,  
                }}
            >
                {children}
            </Admincontext.Provider>
        );

}

export const adminSalon = () => useContext(Admincontext);