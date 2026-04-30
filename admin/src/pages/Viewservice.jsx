import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Pencil, Power } from "lucide-react";
import { adminSalon } from "../context/adminContext";
import { Title } from "../components/Title";
import { useNavigate } from "react-router-dom";

const Viewservice = () => {
  const { backendUrl, token, toast } = adminSalon();
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/get`
      );
      setServices(data.service);
    } catch (err) {
      toast.error("Failed to fetch services");
    }
  };

  //  Toggle Active
  const toggleStatus = async (id) => {
    try {
      await axios.patch(
        `${backendUrl}/api/admin/toggle/${id}`,
        {},
        { headers: { token } }
      );

      toast.success("Status updated");
      fetchServices();
    } catch (err) {
      toast.error("Toggle failed");
    }
  };

  //  Delete
  const deleteService = async (id) => {
    try {
      await axios.delete(
        `${backendUrl}/api/admin/${id}`,
        { headers: { token } }
      );

      toast.success("Service deleted");
      fetchServices();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 pt-5">

      <Title subtitle="Admin Panel" title="All Services" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.map((s) => (
          <div
            key={s._id}
            className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 hover:shadow-lg transition"
          >

            {/* IMAGE */}
            <img
              src={s.image}
              alt=""
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            {/* NAME */}
            <h3 className="text-lg font-semibold capitalize">
              {s.name}
            </h3>

            {/* DESC */}
            <p className="text-sm text-gray-400 line-clamp-2 mt-1">
              {s.description}
            </p>

            {/* PRICE + TIME */}
            <div className="flex justify-between mt-3 text-sm text-gray-300">
              <span>₹{s.price}</span>
              <span>{s.duration} min</span>
            </div>

            {/* TOP SERVICE */}
            {s.topService && (
              <span className="inline-block mt-2 text-xs bg-[#d9c7a0]/20 text-[#d9c7a0] px-2 py-1 rounded">
                Top Service
              </span>
            )}

            {/* ACTIONS */}
            <div className="flex items-center justify-between mt-4">

              {/* TOGGLE */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={s.isActive}
                  onChange={() => toggleStatus(s._id)}
                  className="w-5 h-5 accent-[#d9c7a0]"
                />
                <span className="text-xs text-gray-400">
                  {s.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">

                {/* EDIT */}
                <button
                  onClick={() => navigate(`/service/${s._id}`)}
                  className="text-blue-400 hover:text-blue-500"
                >
                  <Pencil size={18} />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteService(s._id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Viewservice;