import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function FixedBg() {
    const navigate = useNavigate();

  return (
    <section
      className="min-h-screen bg-fixed bg-center bg-cover relative flex items-center justify-center px-6"
      style={{
        backgroundImage:
          "url('https://dpsample.com/wp_themes/polishe/wp-content/uploads/2025/11/image-gen-22-min-2.webp')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">

        {/* Circular Logo */}
        <div className="flex justify-center mb-10">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">

            {/* Center Icon */}
            <div className="absolute z-10 w-20 h-20 rounded-full border border-[#d9c7a0] flex items-center justify-center bg-black/40">
              <User size={40} className="text-[#d9c7a0]" />
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
                fontSize="13"
                letterSpacing="3"
                fontWeight="bold"
                className="uppercase"
              >
                <textPath href="#circlePath">
                  HAIR CUTTING ✦ COLORS ✦ WELCOME ✦ STYLE ✦ BEARD ✦
                </textPath>
              </text>
            </svg>

          </div>
        </div>

        {/*  Text Below */}
        <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-widest leading-tight">
          Premium Salon Experience
        </h2>

        {/* Line Accent */}
        <div className="w-24 h-0.5 bg-[#d9c7a0] mx-auto mt-6 mb-6"></div>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-base tracking-wide leading-relaxed max-w-xl mx-auto">
          Where modern styling meets luxury grooming. Experience precision cuts,
          premium color, and a signature look tailored only for you.
        </p>

        {/*  Button  */}
        <div className="mt-8">
          <button onClick={() => navigate("/services")} className="px-6 py-3 border border-[#d9c7a0] text-[#d9c7a0] uppercase tracking-widest text-sm hover:bg-[#d9c7a0] hover:text-black transition-all duration-300">
            Book Appointment
          </button>
        </div>

      </div>
    </section>
  );
}


