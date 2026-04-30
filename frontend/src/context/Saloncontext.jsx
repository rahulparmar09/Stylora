import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Saloncontext = createContext(null);

export const SalonProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    const [user, setUser] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // token save/remove
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
            setUser(null); // logout 
        }
    }, [token]);

    //  GLOBAL USER FETCH
    const fetchUser = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/user/get`,
                { headers: { token } }
            );

            if (data.success) {
                setUser(data.user);
            }
        } catch (err) {
            console.log(err);
            setToken(null);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token]);

    return (
        <Saloncontext.Provider
            value={{
                backendUrl,
                token,
                setToken,
                user,
                setUser,
                fetchUser,
                toast,  
            }}
        >
            {children}
        </Saloncontext.Provider>
    );
};

export const useSalon = () => useContext(Saloncontext);