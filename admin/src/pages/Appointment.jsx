import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Clock, Trash2, CheckCircle2, BadgeCheck } from "lucide-react";
import { adminSalon } from "../context/adminContext";
import { Title } from "../components/Title";

const Appointment = () => {
    const { backendUrl, token, toast } = adminSalon();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    //  GET ALL APPOINTMENTS
    const fetchAppointments = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/appointment`
            );
            setAppointments(data.appointments);
        } catch (err) {
            toast.error("Failed to fetch appointments");
        }
    };

    //  ACCEPT
    const accept = async (id) => {
        try {
            await axios.put(
                `${backendUrl}/api/appointment/accept/${id}`,
                {},
                { headers: { token } }
            );

            toast.success("Appointment Accepted");
            fetchAppointments();
        } catch (err) {
            toast.error("Action failed");
        }
    };

    //  REJECT
    const reject = async (id) => {
        try {
            await axios.put(
                `${backendUrl}/api/appointment/reject/${id}`,
                {},
                { headers: { token } }
            );

            toast.success("Appointment Rejected");
            fetchAppointments();
        } catch (err) {
            toast.error("Action failed");
        }
    };

    //  COMPLETE 
    const complete = async (id) => {
        try {
            await axios.put(
                `${backendUrl}/api/appointment/complete/${id}`,
                {},
                { headers: { token } }
            );

            toast.success("Appointment completed");
            fetchAppointments();
        } catch (err) {
            toast.error("Complete failed");
        }
    };

    //  DELETE 
    const deleted = async (id) => {
        try {
            await axios.delete(
                `${backendUrl}/api/appointment/delete/${id}`,
                {
                    headers: {
                        token
                    }
                }
            );
            toast.success("Appointment Deleted");
            fetchAppointments();
        } catch (err) {
            console.log(err.response?.data);
            toast.error("Delete failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white px-2 pt-5">

            <Title subtitle="Admin Panel" title="Appointments Management" />

            {/* TABLE */}
            <div className="overflow-x-auto rounded-xl border border-white/10">

                <table className="w-full text-sm">

                    {/* HEADER */}
                    <thead className="bg-[#1a1a1a] text-gray-300">
                        <tr>
                            <th className="p-3 text-left">User</th>
                            <th className="p-3">Contact</th>
                            <th className="p-3">Service</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Time</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Payment</th>
                            <th className="p-3">Payment-Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {appointments.map((a) => (
                            <tr
                                key={a._id}
                                className="border-t border-white/10 hover:bg-[#1a1a1a]"
                            >

                                {/* USER */}
                                <td className="p-3">
                                    <p className="font-medium">{a.userId?.username}</p>
                                </td>

                                {/* CONTACT */}
                                <td className="p-3 text-center">
                                    <p className="font-medium">{a.phone}</p>
                                    <p className="text-xs text-gray-400">{a.email}</p>
                                </td>

                                {/* SERVICE */}
                                <td className="p-3 text-center">
                                    {a.serviceId?.name}
                                </td>

                                <td className="p-3 text-center">
                                    ₹{a.amount}
                                </td>

                                {/* DATE */}
                                <td className="p-3 text-center">
                                    {a.date}
                                </td>

                                {/* TIME */}
                                <td className="p-3 text-center">
                                    {a.time}
                                </td>


                                {/* STATUS */}
                                <td className="p-3 text-center">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold
                                     ${a.status === "pending" && "bg-yellow-500/20 text-yellow-400"}
                                     ${a.status === "accepted" && "bg-green-500/20 text-green-400"}
                                     ${a.status === "rejected" && "bg-red-500/20 text-red-400"}
                                     ${a.status === "cancelled" && "bg-gray-500/20 text-gray-300"}
                                 `}>
                                        {a.status}
                                    </span>
                                </td>

                                {/* PAYMENT */}
                                <td className="p-3 text-center">
                                    <span className={`text-xs font-semibold ${a.paymentType === "paid"
                                        ? "text-green-400"
                                        : "text-yellow-400"
                                        }`}>
                                        {a.paymentType || "COD"}
                                    </span>
                                </td>

                                {/* PAYMENT STATUS*/}
                                <td className="p-3 text-center">
                                    <span className={`text-xs font-semibold ${a.paymentStatus === "paid"
                                        ? "text-green-400"
                                        : "text-yellow-400"
                                        }`}>
                                        {a.paymentStatus}
                                    </span>
                                </td>

                                {/* ACTION */}
                                <td className="p-3">

                                    <div className="flex gap-2 justify-center">

                                        {/* ACCEPT */}
                                        {a.status === "pending" && (
                                            <button
                                                onClick={() => accept(a._id)}
                                                className="text-green-400 hover:text-green-500"
                                            >
                                                <CheckCircle size={18} />
                                            </button>
                                        )}

                                        {/* REJECT */}
                                        {a.status === "pending" && (
                                            <button
                                                onClick={() => reject(a._id)}
                                                className="text-red-400 hover:text-red-500"
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        )}

                                        {/* Complete */}
                                        {a.status === "accepted" && (
                                            <button
                                                onClick={() => complete(a._id)}
                                                className="text-gray-400 hover:text-gray-200"
                                            >
                                                <BadgeCheck size={18} />
                                            </button>
                                        )}

                                        {/* Delete */}
                                        {["rejected", "cancelled"].includes(a.status) && (
                                            <button
                                                onClick={() => deleted(a._id)}
                                                className="text-gray-400 hover:text-gray-200"
                                            >
                                                <Trash2 size={18} />
                                            </button>
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
};

export default Appointment;