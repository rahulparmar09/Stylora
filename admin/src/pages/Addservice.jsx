import React, { useEffect, useState } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";
import { Title } from "../components/Title";
import { adminSalon } from "../context/adminContext";
import { useParams, useNavigate } from "react-router-dom";

const Addservice = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const { backendUrl, token, toast } = adminSalon();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    topService: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (isEdit) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/get`);

      const service = data.service.find((s) => s._id === id);

      if (!service) return toast.error("Service not found");

      setForm({
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        topService: service.topService,
      });

      setPreview(service.image);

    } catch (err) {
      toast.error("Failed to load service");
    }
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Image
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit (Add + Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      let res;

      if (isEdit) {
        //  UPDATE
        res = await axios.put(
          `${backendUrl}/api/admin/${id}`,
          formData,
          { headers: { token } }
        );

      } else {
        //  ADD
        res = await axios.post(
          `${backendUrl}/api/admin/add`,
          formData,
          { headers: { token } }
        );
      }

      if (res.data.success) {
        toast.success(res.data.msg || "Success");

        navigate("/view-service");
      }

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 pt-5">

      <div className="max-w-3xl mx-auto bg-[#1a1a1a] p-8 rounded-2xl">

        <Title
          subtitle="Admin Panel"
          title={isEdit ? "Edit Service" : "Add New Service"}
        />

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-[#d9c7a0] mb-2 tracking-wide">
              Service Name
            </label>
            <input

              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter service name"
              className="w-full p-3 bg-[#121212] border border-gray-700 rounded-lg focus:border-[#d9c7a0] focus:outline-none transition"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-[#d9c7a0] mb-2 tracking-wide">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter service details..."
              className="w-full p-3 bg-[#121212] border border-gray-700 rounded-lg focus:border-[#d9c7a0] focus:outline-none transition"
            />
          </div>

          {/* PRICE + TIME */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-[#d9c7a0] mb-2">
                Price (₹)
              </label>

              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                placeholder="500"
                className="w-full p-3 bg-[#121212] border border-gray-700 rounded-lg focus:border-[#d9c7a0] focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#d9c7a0] mb-2">
                Duration (min)
              </label>

              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                type="number"
                placeholder="60"
                className="w-full p-3 bg-[#121212] border border-gray-700 rounded-lg focus:border-[#d9c7a0] focus:outline-none transition"
              />
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-medium text-[#d9c7a0] mb-2">
              Service Image
            </label>

            <div className="border-2 border-dashed border-gray-700 p-6 text-center rounded-lg hover:border-[#d9c7a0] transition">

              <input type="file" hidden id="img" onChange={handleImage} />

              <label htmlFor="img" className="cursor-pointer flex flex-col items-center gap-2">
                <UploadCloud className="text-[#d9c7a0]" />
                <span className="text-sm text-gray-400">
                  Click to upload image
                </span>
              </label>

              {preview && (
                <img
                  src={preview}
                  className="h-32 mx-auto mt-4 rounded-lg object-cover"
                />
              )}
            </div>
          </div>

          {/* TOP SERVICE */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="topService"
              checked={form.topService}
              onChange={handleChange}
              className="w-5 h-5 accent-[#d9c7a0]"
            />

            <label className="text-sm text-gray-300">
              <span className="text-[#d9c7a0] font-medium">Top Service</span>
            </label>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-[#d9c7a0] text-black py-3 rounded-full font-semibold tracking-wide hover:opacity-90 transition"
          >
            {loading
              ? "Processing..."
              : isEdit
                ? "Update Service"
                : "Add Service"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addservice;