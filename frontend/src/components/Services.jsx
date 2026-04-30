import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSalon } from "../context/Saloncontext";
import { Search } from "lucide-react";
import { Title } from "../components/Title";
import { useNavigate } from "react-router-dom";



const Services = () => {
  const { backendUrl } = useSalon();
  const navigate = useNavigate()

  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [filterTop, setFilterTop] = useState(false);

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/get`
      );

      if (data.success) {
        setServices(data.service); 
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // filter logic
  const filtered = services.filter((s) => {
    const matchSearch = s.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchTop = filterTop ? s.topService : true;

    return matchSearch && matchTop;
  });

  return (
    <div className="min-h-screen bg-[#121212] text-white px-4 md:px-20 py-16">

      {/* TITLE */}
      <Title subtitle="Our Services" title="Premium Salon Experience" />

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">

        {/* Search */}
        <div className="flex items-center bg-[#1a1a1a] px-4 py-2 rounded-full border border-white/10 w-full md:w-96">
          <Search className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none px-2 w-full text-sm"
          />
        </div>

        {/* Filter */}
        <button
          onClick={() => setFilterTop(!filterTop)}
          className={`px-5 py-2 rounded-full border transition ${
            filterTop
              ? "bg-[#d9c7a0] text-black"
              : "border-white/20 text-gray-300"
          }`}
        >
          Top Services
        </button>
      </div>

      {/* SERVICES GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {filtered.map((service) => {
          const isActive = service.isActive;

          return (
            <div
              key={service._id}
              className={`rounded-2xl overflow-hidden border shadow-lg transition
              ${isActive
                  ? "bg-[#1a1a1a] border-white/10"
                  : "bg-[#1a1a1a]/40 border-white/5 opacity-60"
                }`}
            >

              {/* IMAGE */}
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className={`w-full h-56 object-cover ${
                    !isActive && "grayscale"
                  }`}
                />

                {service.topService && (
                  <span className="absolute top-3 left-3 bg-[#d9c7a0] text-black text-xs px-3 py-1 rounded-full">
                    Top
                  </span>
                )}

                {!isActive && (
                  <span className="absolute top-3 right-3 bg-red-500 text-xs px-3 py-1 rounded-full">
                    Unavailable
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">

                <h3 className="text-lg font-semibold capitalize">
                  {service.name}
                </h3>

                <p className="text-sm text-gray-400 line-clamp-2">
                  {service.description || "Premium salon service"}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-300">
                  <span>⏱ {service.duration} min</span>
                  <span className="text-[#d9c7a0] font-semibold">
                    ₹{service.price}
                  </span>
                </div>

                {/* BUTTON */}
                <button
                  disabled={!isActive}
                  onClick={() => navigate(`/booking/${service._id}`)}
                  className={`w-full mt-3 py-2 rounded-full font-semibold transition
                    ${
                      isActive
                        ? "bg-[#d9c7a0] text-black hover:opacity-90"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {isActive ? "Book Now" : "Not Available"}
                </button>
              </div>
            </div>
          );
        })}

      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No services found 😕
        </p>
      )}
    </div>
  );
};

export default Services;