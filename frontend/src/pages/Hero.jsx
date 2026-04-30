import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center pt-5 md:pt-0 px-6 md:px-12 relative overflow-hidden">

      {/* soft glow background */}
      <div className="absolute w-100 h-100 bg-white/5 blur-[120px] rounded-full top-10 right-10"></div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* LEFT TEXT */}
        <div>

          {/* SMALL TITLE (MATCH STYLE) */}
          <div className="flex items-center gap-3 text-[#d9c7a0] mb-4">
            <span className="uppercase tracking-[4px] text-sm font-medium">
              Premium Salon Experience
            </span>
          </div>

          {/* MAIN HEADING  */}
          <h1 className="text-4xl md:text-6xl font-serif uppercase text-white leading-tight">
            Redefine Your <br />
            <span className="text-[#d9c7a0] italic">
              Signature Style
            </span>
          </h1>

          {/* DECOR LINE  */}
          <div className="w-20 h-0.5 bg-[#d9c7a0] mt-5"></div>

          {/* DESCRIPTION */}
          <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-md font-light tracking-wide">
            Step into a world where precision meets luxury.
            Our expert stylists craft a look that defines your personality,
            enhances your confidence, and brings out your true elegance.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate("/services")}
              className="w-full sm:w-auto bg-[#d9c7a0] text-black px-5 py-3 md:px-7 md:py-3 rounded-full font-semibold 
                   border border-transparent
                   hover:bg-transparent hover:text-[#d9c7a0] hover:border-[#d9c7a0]
                  transition-all duration-300 text-sm md:text-base"
            >
              Book Appointment
            </button>
            <button
              onClick={() => navigate("/services")}
              className="w-full sm:w-auto border border-[#d9c7a0] px-5 py-3 md:px-7 md:py-3 rounded-full text-[#d9c7a0] hover:bg-[#d9c7a0] hover:text-black transition duration-300 text-sm md:text-base">
              Explore Services
            </button>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="https://dpsample.com/wp_themes/polishe/wp-content/uploads/2025/11/image-gen-21-min-3.webp"
            className="w-[320px] md:w-180 h-120 object-cover  shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}