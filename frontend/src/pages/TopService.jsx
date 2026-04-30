import React, { useState, useEffect } from "react";
import { Title } from "../components/Title";
import { useSalon } from "../context/Saloncontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const TopService = () => {
  const { backendUrl } = useSalon();
  const [service, setService] = useState([]);
  const navigate = useNavigate()

  const getService = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/admin/get`);

      const topServices = (res.data.service || [])
        .filter((item) => item.topService === true)
        .slice(0, 4);

      setService(topServices);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <section className="py-20 bg-[#121212]">
      <Title subtitle="Top Services" title="Our Best Services" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 px-4">

        {service.length > 0 ? (
          service.map((item) => {
            const isActive = item.isActive;

            return (
              <div
                key={item._id}
                className={`rounded-2xl overflow-hidden border transition shadow-md
                ${isActive
                    ? "bg-[#1a1a1a] border-white/10"
                    : "bg-[#1a1a1a]/40 border-white/5 opacity-60"
                  }`}
              >

                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`h-56 w-full object-cover ${!isActive && "grayscale"
                      }`}
                  />

                  {/* TOP TAG */}
                  <span className="absolute top-3 left-3 bg-[#d9c7a0] text-black text-[10px] px-3 py-1 rounded-full font-semibold">
                    Top
                  </span>

                  {/* STATUS */}
                  {!isActive && (
                    <span className="absolute top-3 right-3 bg-red-500 text-[10px] px-3 py-1 rounded-full">
                      Unavailable
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5 text-white space-y-3">

                  <h2 className="text-lg font-semibold capitalize truncate">
                    {item.name}
                  </h2>

                  <p className="text-xs text-gray-400 line-clamp-2">
                    {item.description || "Premium salon service"}
                  </p>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#d9c7a0] font-semibold">
                      ₹{item.price}
                    </span>

                    <span className="text-gray-500">
                      {item.duration} min
                    </span>
                  </div>

                  {/* BUTTON */}
                  <button
                    disabled={!isActive}
                    onClick={() => navigate(`/booking/${item._id}`)}
                    className={`w-full mt-2 py-2 rounded-full text-sm font-semibold transition
                      ${isActive
                        ? "bg-[#d9c7a0] text-black hover:opacity-90"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    {isActive ? "Book Now" : "Not Available"}
                  </button>

                </div>
              </div>
            );
          })
        ) : (
          <p className="text-white text-center col-span-full">
            Loading top services...
          </p>
        )}
      </div>
    </section>
  );
};

export default TopService;