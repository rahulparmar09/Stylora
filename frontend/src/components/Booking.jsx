import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSalon } from "../context/Saloncontext";

const Booking = () => {
    const { id } = useParams();
    const { backendUrl, token, toast } = useSalon();

    const [service, setService] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [paymentType, setPaymentType] = useState("cash");
    const [appointments, setAppointments] = useState([]);
    const [phone, setPhone] = useState("");

    // NEXT 7 DAYS
    const getNext7Days = () => {
        const arr = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            arr.push(d.toISOString().split("T")[0]);
        }
        return arr;
    };

    // TIME SLOT GENERATOR (12H FORMAT + PAST FILTER)
    const getTimeSlots = () => {
        const slots = [];
        const now = new Date();
        const isToday = date === now.toISOString().split("T")[0];

        for (let h = 10; h <= 19; h++) {
            const hour12 = h > 12 ? h - 12 : h;
            const period = h >= 12 ? "PM" : "AM";

            const pushSlot = (min) => {
                const slotDate = new Date();
                slotDate.setHours(h);
                slotDate.setMinutes(min);
                slotDate.setSeconds(0);

                //  hide past slots only if today
                if (!isToday || slotDate > now) {
                    slots.push(`${hour12}:${min === 0 ? "00" : min} ${period}`);
                }
            };

            pushSlot(0);
            if (h !== 19) pushSlot(30);
        }

        return slots;
    };

    // FETCH SERVICE
    const fetchService = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/get`);
            const found = data.service.find((s) => s._id === id);
            setService(found);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/appointment`);
            if (data.success) {
                setAppointments(data.appointments);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchService();
        fetchAppointments();
    }, [id]);

    // BOOK APPOINTMENT
    const handleBook = async () => {

        if (!token) {
            toast.error("Please login first");
            return;
        }

        //  PHONE VALIDATION
        const phoneRegex = /^[0-9]{10}$/;

        if (!phoneRegex.test(phone) || phone.length !== 10) {
            toast.error("Enter valid 10-digit phone number");
            return;
        }

        if (!date || !time) {
            toast.error("Select date and time");
            return;
        }

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/appointment`,
                {
                    serviceId: id,
                    date,
                    time,
                    paymentType,
                    phone
                },
                {
                    headers: { token },
                }
            );

            toast.success(data.message);
        } catch (err) {
            toast.error(err.response?.data?.message || "Booking failed");
        }
    };
    
    const getBookedSlots = () => {
        return appointments
            .filter(
                (a) =>
                    a.date === date &&
                    ["pending", "accepted"].includes(a.status)
            )
            .map((a) => a.time);
    };

    const bookedSlots = getBookedSlots();
    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
                Loading service...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121212] text-white px-4 md:px-10 py-12">

            {/* CARD */}
            <div className="max-w-6xl mx-auto bg-[#1a1a1a]/70 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

                {/* TOP SECTION */}
                <div className="md:flex">

                    {/* IMAGE */}
                    <div className="md:w-1/2">
                        <img
                            src={service.image}
                            className="w-full h-full object-cover md:h-112.5"
                        />
                    </div>

                    {/* INFO */}
                    <div className="p-8 md:w-1/2 space-y-5">

                        <h2 className="text-3xl font-bold capitalize">
                            {service.name}
                        </h2>

                        <p className="text-gray-400 leading-relaxed">
                            {service.description ||
                                "Premium salon experience with expert professionals, relaxing environment, and top-quality service designed just for you."}
                        </p>

                        <div className="flex justify-between text-sm text-gray-300">
                            <span>⏱ {service.duration} min</span>
                            <span className="text-[#d9c7a0] text-xl font-bold">
                                ₹{service.price}
                            </span>
                        </div>

                        <div className="h-px bg-white/10"></div>

                        <p className="text-xs text-gray-500">
                            Select date, time and payment method to confirm your appointment instantly.
                        </p>
                    </div>
                </div>

                {/* SELECTION AREA */}
                <div className="p-8 space-y-10">

                    {/* DATE */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Select Date</h3>

                        <div className="flex flex-wrap gap-3">
                            {getNext7Days().map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDate(d)}
                                    className={`px-4 py-2 rounded-full border text-sm transition
                                    ${date === d
                                            ? "bg-[#d9c7a0] text-black"
                                            : "border-white/20 text-gray-300 hover:border-[#d9c7a0]"
                                        }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TIME */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Select Time</h3>

                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                            {getTimeSlots().map((t) => {
                                const isBooked = bookedSlots.includes(t);

                                return (
                                    <button
                                        key={t}
                                        onClick={() => !isBooked && setTime(t)}
                                        disabled={isBooked}
                                        className={`py-2 rounded-lg text-sm border transition
                                             ${isBooked
                                                ? "bg-red-500/20 text-red-400 cursor-not-allowed border-red-500/30"
                                                : time === t
                                                    ? "bg-[#d9c7a0] text-black"
                                                    : "border-white/20 text-gray-300 hover:border-[#d9c7a0]"
                                            }`}
                                    >
                                        {t}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                        🔴 Red slots are already booked
                    </p>

                    {/* PAYMENT */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Payment Method</h3>

                        <div className="flex gap-4">
                            {["cash", "online"].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPaymentType(p)}
                                    className={`px-6 py-2 rounded-full border text-sm capitalize transition
                                    ${paymentType === p
                                            ? "bg-[#d9c7a0] text-black"
                                            : "border-white/20 text-gray-300 hover:border-[#d9c7a0]"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CONTACT DETAILS */}
                    <h3 className="text-lg font-semibold mb-3">Contact Number</h3>
                    <div className="flex items-center w-full px-4 py-2 rounded-lg bg-[#222] border border-white/20 text-white">

                        <span className="text-gray-400 mr-2">+91</span>

                        <input
                            type="text"
                            placeholder="12345 67890"
                            value={phone}
                            maxLength={10}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                setPhone(val);
                            }}
                            className="w-full bg-transparent outline-none text-white tracking-widest"
                        />
                    </div>
                    {/* BUTTON */}
                    <button
                        onClick={handleBook}
                        disabled={!date || !time || !phone}
                        className={`w-full py-4 rounded-full font-semibold text-lg transition
                                ${date && time && phone
                                ? "bg-[#d9c7a0] text-black hover:opacity-90"
                                : "bg-gray-700 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Confirm Appointment
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Booking;