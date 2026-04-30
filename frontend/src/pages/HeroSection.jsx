import React from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-screen px-5 sm:px-8 md:px-16 py-12 flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full">

        {/* LEFT IMAGE */}
        <div className="flex justify-center">
          <div className="w-65 h-95 sm:w-[320px] sm:h-115 md:w-105 md:h-162.5 rounded-[200px] overflow-hidden shadow-2xl border border-[#d9c7a0]/30">
            <img
              src="https://dpsample.com/wp_themes/polishe/wp-content/uploads/2025/11/image-gen-min.webp"
              alt="Salon"
              className="w-full h-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">

          {/* Circular Logo */}
          <div className="relative mb-4 w-30 h-30 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center mx-auto md:mx-0">

            {/* Center Icon */}
            <div className="absolute z-10 flex items-center justify-center">
              <User size={30} className="sm:size-36 md:size-10.5 text-[#d9c7a0]" />
            </div>

            {/* Circular Text */}
            <svg
              className="absolute w-full h-full animate-spin-slows"
              viewBox="0 0 200 200"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>

              <text
                fill="#d9c7a0"
                fontSize="10"
                className="sm:text-[12px] md:text-[14px] uppercase tracking-[3px] font-semibold"
              >
                <textPath href="#circlePath">
                  HAIR CUTTING ✦ COLORS ✦ WELCOME ✦ STYLE BEARD ✦ HELLO
                </textPath>
              </text>
            </svg>
          </div>

          {/* Heading */}
          <div className="pl-0 md:pl-4">
            <p className="text-[#d9c7a0] text-lg sm:text-xl md:text-2xl italic font-serif mb-2">
              about us
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight uppercase text-white">
              Welcome To <br />
              Stylora Salon
            </h2>

            {/* Description */}
            <p className="mt-5 text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              At Stylora, we believe your hair deserves artistry and care.
              Our team blends creativity with precision to craft styles that
              enhance your natural beauty.
            </p>

            {/* Bottom */}
            <div className="mt-8 flex flex-col sm:flex-row gap-5 sm:gap-6 md:gap-8 items-center md:items-start justify-center md:justify-start w-full">

              <button
                onClick={() => navigate("/about")}
                className="w-full sm:w-auto border border-[#d9c7a0] px-6 py-3 md:px-8 md:py-4 text-white 
                hover:bg-[#d9c7a0] hover:text-black transition duration-300 text-sm sm:text-base"
              >
                MORE ABOUT US
              </button>

              <div className="text-center md:text-left">
                <p className="text-xs sm:text-sm uppercase text-gray-400">
                  Phone Number
                </p>
                <p className="text-xl sm:text-2xl font-light text-white">
                  +91 123456 987654
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}