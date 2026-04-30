import React, { useEffect, useState } from "react";

const Loader = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 12); // speed control

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-[#121212] flex flex-col items-center justify-center z-999">

            {/* Glow */}
            <div className="absolute w-60 h-60 bg-[#d9c7a0]/10 blur-3xl rounded-full"></div>

            {/* Brand */}
            <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-[6px] 
                  bg-gradient-to-b from-white via-[#d9c7a0] to-white 
                 bg-clip-text text-transparent">
                Stylora
            </h2>

            {/* Line */}
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#d9c7a0] to-transparent mt-4"></div>

            {/* Percentage */}
            <p className="mt-6 text-lg text-[#d9c7a0] font-semibold tracking-widest">
                {count < 99
                    ? `${count}%`
                    : count === 99
                        ? "Preparing experience..."
                        : "Welcome "}
            </p>
            {/* Progress bar */}
            <div className="w-40 h-0.5 bg-white/10 mt-2 overflow-hidden">
                <div
                    className="h-full bg-[#d9c7a0] transition-opacity duration-500"
                    style={{ width: `${count}%` }}
                ></div>
            </div>

            {/* Text */}
            <p className="mt-4 text-xs tracking-[5px] text-gray-500">
                LOADING EXPERIENCE
            </p>
        </div>
    );
};

export default Loader;