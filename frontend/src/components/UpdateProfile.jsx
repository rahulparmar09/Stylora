import React, { useState } from "react";
import { Title } from "../components/Title";
import { useSalon } from "../context/Saloncontext";
import axios from "axios";

const UpdateProfile = () => {
    const { user, backendUrl, token, fetchUser, toast } = useSalon();

    const [form, setForm] = useState({
        username: user?.username || "",
        email: user?.email || "",
        address: user?.address || "",
        gender: user?.gender || "",
        dob: user?.dob || "",
        phone: user?.phone || "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(user?.image || "");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            Object.keys(form).forEach((key) => {
                if (form[key]) formData.append(key, form[key]);
            });

            if (image) formData.append("image", image);

            await axios.patch(
                `${backendUrl}/api/user/update-profile`,
                formData,
                {
                    headers: { token },
                }
            );

            await fetchUser();
            toast.success("Profile updated!");

        } catch (err) {
            console.log(err);
            toast.error("Error updating profile");
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white px-4 md:px-20 py-16">

            <Title subtitle="Profile" title="Update Your Profile" />

            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-[#1a1a1a] p-8 rounded-2xl shadow-lg border border-white/10 space-y-6"
            >

                {/* IMAGE */}
                <div className="flex flex-col items-center gap-4">
                    <img
                        src={preview || "/default-avatar.png"}
                        alt="profile"
                        className="w-28 h-28 rounded-full object-cover border-2 border-[#d9c7a0]"
                    />

                    <input
                        type="file"
                        onChange={handleImage}
                        className="text-sm text-gray-400"
                    />
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* Username (disabled) */}
                    <input
                        type="text"
                        value={form.username}
                        disabled
                        className="bg-[#2a2a2a] text-gray-400 p-3 rounded-lg outline-none cursor-not-allowed"
                    />

                    {/* Email (disabled) */}
                    <input
                        type="email"
                        value={form.email}
                        disabled
                        className="bg-[#2a2a2a] text-gray-400 p-3 rounded-lg outline-none cursor-not-allowed"
                    />

                    {/* Phone */}
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="bg-[#121212] border border-white/10 p-3 rounded-lg focus:border-[#d9c7a0] outline-none"
                    />

                    {/* DOB */}
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        className="bg-[#121212] border border-white/10 p-3 rounded-lg focus:border-[#d9c7a0] outline-none"
                    />

                    {/* Gender */}
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="bg-[#121212] border border-white/10 p-3 rounded-lg focus:border-[#d9c7a0] outline-none"
                    >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>

                    {/* Address */}
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        className="bg-[#121212] border border-white/10 p-3 rounded-lg focus:border-[#d9c7a0] outline-none"
                    />

                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="w-full bg-[#d9c7a0] text-black py-3 rounded-full font-semibold hover:opacity-90 transition"
                >
                    Update Profile
                </button>

            </form>
        </div>
    );
};

export default UpdateProfile;