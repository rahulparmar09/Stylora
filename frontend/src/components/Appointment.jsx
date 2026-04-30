import { useSalon } from "../context/Saloncontext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Title } from "../components/Title";

export default function Appointment() {
    const { backendUrl, token, toast } = useSalon();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const { data } = await axios.get(`${backendUrl}/api/appointment/my`, {
            headers: { token }
        });
        setAppointments(data.appointment.reverse());
    };

    const cancelAppointment = async (id) => {
        await axios.put(`${backendUrl}/api/appointment/cancel/${id}`, {}, {
            headers: { token }
        });
        toast.success("Cancel Appointment")
        fetchAppointments();
    };

    const handleRazorpay = async (appointmentId) => {
        const { data } = await axios.post(
            `${backendUrl}/api/payment/razorpay/create`,
            { appointmentId },
            { headers: { token } }
        );

        const options = {
            key: data.key,
            amount: data.order.amount,
            currency: "INR",
            order_id: data.order.id,

            handler: async function (response) {
                await axios.post(
                    `${backendUrl}/api/payment/razorpay/verify`,
                    {
                        appointmentId,
                        ...response
                    },
                    { headers: { token } }
                );

                toast.success("Payment Successful");
                fetchAppointments();

            }
        };

        new window.Razorpay(options).open();
    };

    const handleStripe = async (appointmentId) => {
        localStorage.setItem("lastAppointmentId", appointmentId);

        const { data } = await axios.post(
            `${backendUrl}/api/payment/stripe/create`,
            { appointmentId },
            { headers: { token } }
        );

        window.location.href = data.url;
    };

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const success = query.get("success");

        //  run only once
        const alreadyRun = sessionStorage.getItem("stripe_done");

        if (success === "true" && !alreadyRun) {

            sessionStorage.setItem("stripe_done", "true");

            const confirmPayment = async () => {
                try {
                    const appointmentId = localStorage.getItem("lastAppointmentId");

                    if (!appointmentId) {
                        toast.error("Appointment not found");
                        return;
                    }

                    await axios.post(
                        `${backendUrl}/api/payment/stripe/confirm`,
                        { appointmentId },
                        { headers: { token } }
                    );

                    toast.success("Payment Successful");

                    // clean up
                    localStorage.removeItem("lastAppointmentId");

                    fetchAppointments();

                } catch (err) {
                    toast.error("Payment update failed");
                }
            };

            confirmPayment();
        }

        // reset flag when leaving page
        return () => {
            sessionStorage.removeItem("stripe_done");
        };

    }, [token]);

    return (
        <div className="p-4 md:p-6 text-white">

            <h2 className="text-xl md:text-2xl font-serif uppercase leading-tight font-bold mb-6 text-[#d9c7a0]">
                My Appointments
            </h2>

            {/*  RESPONSIVE WRAPPER */}
            <div className="overflow-x-auto rounded-lg border border-white/10">

                <table className="min-w-225 w-full">

                    {/* HEADER */}
                    <thead className="bg-[#111] text-gray-300 text-xs md:text-sm">
                        <tr>
                            <th className="p-3 text-left">Service</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Time</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Payment</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {appointments.map((a) => (
                            <tr
                                key={a._id}
                                className="border-t border-white/10 hover:bg-[#1a1a1a] text-xs md:text-sm"
                            >

                                {/* SERVICE */}
                                <td className="p-3 flex items-center gap-2 md:gap-3 min-w-50">
                                    <img
                                        src={a.serviceId.image}
                                        alt=""
                                        className="w-10 h-10 md:w-14 md:h-14 rounded-lg object-cover"
                                    />
                                    <span className="truncate">{a.serviceId.name}</span>
                                </td>

                                <td className="p-3 text-center whitespace-nowrap">{a.date}</td>
                                <td className="p-3 text-center whitespace-nowrap">{a.time}</td>
                                <td className="p-3 text-center whitespace-nowrap">₹{a.amount}</td>

                                {/* STATUS */}
                                <td className="p-3 text-center">
                                    <span className={`px-2 py-1 text-[10px] md:text-xs rounded font-semibold
                                    ${a.status === "pending" && "bg-yellow-500/20 text-yellow-400"}
                                    ${a.status === "accepted" && "bg-blue-500/20 text-blue-400"}
                                    ${a.status === "completed" && "bg-green-500/20 text-green-400"}
                                    ${a.status === "cancelled" && "bg-red-500/20 text-red-400"}
                                    ${a.status === "rejected" && "bg-gray-500/20 text-gray-400"}
                                `}>
                                        {a.status}
                                    </span>
                                </td>

                                {/* PAYMENT */}
                                <td className="p-3 text-center">
                                    {a.paymentStatus === "pending" ? (
                                        <span className="text-yellow-400 text-[10px] md:text-xs font-semibold">
                                            Pending
                                        </span>
                                    ) : (
                                        <span className="text-green-400 text-[10px] md:text-xs font-semibold">
                                            Paid
                                        </span>
                                    )}
                                </td>

                                {/* ACTION */}
                                <td className="p-3 text-center">
                                    <div className="flex flex-col md:flex-row gap-2 items-center justify-center">

                                        {/* CANCEL */}
                                        {["pending", "accepted"].includes(a.status) && (
                                            <button
                                                onClick={() => cancelAppointment(a._id)}
                                                className="bg-red-500 hover:bg-red-600 transition text-[10px] md:text-xs px-2 md:px-3 py-1 rounded"
                                            >
                                                Cancel
                                            </button>
                                        )}

                                        {/* PAY BUTTONS */}
                                        {["pending", "accepted"].includes(a.status) &&
                                            a.paymentStatus === "pending" && (
                                                <>
                                                    <button
                                                        onClick={() => handleRazorpay(a._id)}
                                                        className="bg-green-500 hover:bg-green-600 text-[10px] md:text-xs px-2 md:px-3 py-1 rounded"
                                                    >
                                                        Razorpay
                                                    </button>

                                                    <button
                                                        onClick={() => handleStripe(a._id)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-[10px] md:text-xs px-2 md:px-3 py-1 rounded"
                                                    >
                                                        Stripe
                                                    </button>
                                                </>
                                            )}
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}