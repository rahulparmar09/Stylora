import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className=" bottom-0 left-0 w-full bg-[#121212]/90 backdrop-blur-xl border-t border-white/10 text-white z-50">

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Left Section */}
        <div>

          <img
            src="\public\logo.png"
            alt="Stylora"
            onClick={() => navigate("/")}
            className="w-40 mb-6 opacity-90"
          />

          <p className="text-gray-400 leading-relaxed mb-6">
            Premium salon experience built with precision, style and modern luxury aesthetics.
          </p>


          <p className="text-gray-400 text-sm">
            Built by{" "}
            <span className="text-[#d9c7a0] font-semibold">
              RahulParmar
            </span>
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-2xl font-serif uppercase mb-6 text-[#d9c7a0]">
            Contact
          </h3>

          <div className="text-gray-400 space-y-4 leading-relaxed">
            <p>
              101 Styleora Hill Town Complex  <br />
              Nikol Ahmedabad 383830
            </p>

            <p>
              P: +91 123456 987654 <br />
              E: info@stylorasalon.com
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-2xl font-serif uppercase mb-6 text-[#d9c7a0]">
            Follow Us
          </h3>

          <div className="flex gap-4">
            {["X", "f", "◎", "in"].map((item, index) => (
              <div
                key={index}
                className="w-11 h-11 rounded-full border border-[#d9c7a0]/50 flex items-center justify-center text-sm text-gray-300 hover:bg-[#d9c7a0] hover:text-black transition duration-300 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm mt-6">
            Follow us for latest styles & updates
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-gray-500 text-sm gap-2">

          <p>© 2025 Stylora. All rights reserved.</p>

          <div className="flex gap-6">
            <p className="hover:text-white cursor-pointer">Privacy Policy</p>
            <p className="hover:text-white cursor-pointer">Terms</p>
          </div>

        </div>
      </div>

    </footer>
  );
}