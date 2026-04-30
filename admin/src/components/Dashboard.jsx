import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Calendar,
  Scissors,
  IndianRupee
} from "lucide-react";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

import { adminSalon } from "../context/adminContext";

const Dashboard = () => {
  const { backendUrl, token } = adminSalon();

  const [stats, setStats] = useState({});
  const [statusData, setStatusData] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await axios.get(`${backendUrl}/api/user/get-all`);
      const appRes = await axios.get(`${backendUrl}/api/appointment`);
      const serviceRes = await axios.get(`${backendUrl}/api/admin/get`);

      const appointments = appRes.data.appointments;
      const services = serviceRes.data.service;

      //  REVENUE BY DATE
      const revenueGroup = {};

      appointments.forEach(a => {
        if (!revenueGroup[a.date]) {
          revenueGroup[a.date] = 0;
        }
        if (a.paymentStatus === "paid") {
          revenueGroup[a.date] += a.amount;
        }
      });

      const revenueArr = Object.keys(revenueGroup).map(date => ({
        date,
        revenue: revenueGroup[date]
      }));

      setRevenueData(revenueArr);


      //  TOTAL REVENUE
      const revenue = appointments
        .filter(a => a.paymentStatus === "paid" )
        .reduce((sum, a) => sum + a.amount, 0);

      //  TODAY REVENUE
      const today = new Date().toISOString().split("T")[0];
      const todayRevenue = appointments
        .filter(a => a.date === today)
        .reduce((sum, a) => sum + a.amount, 0);

      //  TOP SERVICES
      const serviceCount = {};
      appointments.forEach(a => {
        const name = a.serviceId?.name;
        serviceCount[name] = (serviceCount[name] || 0) + 1;
      });

      const top = Object.keys(serviceCount).map(key => ({
        name: key,
        count: serviceCount[key]
      }));

      //  STATUS COUNT
      const statusCount = {};
      appointments.forEach(a => {
        statusCount[a.status] = (statusCount[a.status] || 0) + 1;
      });

      //  RECENT APPOINTMENTS
      const recent = [...appointments]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({
        users: usersRes.data.user || usersRes.data.count,
        appointments: appointments.length,
        services: services.length,
        revenue,
        todayRevenue
      });

      setStatusData(
        Object.keys(statusCount).map(key => ({
          name: key,
          value: statusCount[key]
        }))
      );

      setTopServices(top);
      setRecentAppointments(recent);

    } catch (err) {
      console.log(err);
    }
  };


  const COLORS = ["#22c55e", "#ef4444", "#facc15", "#9ca3af"];

  return (
    <div className="p-6 bg-[#121212] text-white min-h-screen">

      {/*  CARDS */}
      <div className="grid md:grid-cols-5 gap-4 mb-6">

        <Card icon={<Users />} title="Users" value={stats.users} />
        <Card icon={<Calendar />} title="Appointments" value={stats.appointments} />
        <Card icon={<Scissors />} title="Services" value={stats.services} />
        <Card icon={<IndianRupee />} title="Revenue" value={`₹${stats.revenue}`} />
        <Card icon={<IndianRupee />} title="Today Revenue" value={`₹${stats.todayRevenue}`} />

      </div>

      {/*  CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* PIE */}
        <div className="bg-[#1a1a1a] p-4 rounded-xl">
          <h2 className="mb-4 font-semibold">Appointment Status</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} dataKey="value" outerRadius={100} label>
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* TOP SERVICES */}
        <div className="bg-[#1a1a1a] p-4 rounded-xl">
          <h2 className="mb-4 font-semibold">Top Services</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topServices}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/*  REVENUE CHART */}
        <div className="bg-[#1a1a1a] p-4 rounded-xl md:col-span-2">
          <h2 className="mb-4 font-semibold">Revenue Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "#1f1f1f", border: "none" }} />
              <Bar dataKey="revenue" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/*  RECENT */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl mt-6 overflow-x-auto">
        <h2 className="mb-4 font-semibold">Recent Appointments</h2>

        <table className="w-full text-sm text-left">

          {/* HEADER */}
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="py-2 px-3">User</th>
              <th className="py-2 px-3">Service</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3 text-right">Amount</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {recentAppointments.map((a) => (
              <tr
                key={a._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="py-2 px-3">{a.userId?.username}</td>
                <td className="py-2 px-3">{a.serviceId?.name}</td>
                <td className="py-2 px-3">{a.date}</td>
                <td className="py-2 px-3 text-right text-green-400">
                  ₹{a.amount}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

//  CARD
const Card = ({ icon, title, value }) => (
  <div className="bg-[#1a1a1a] p-4 rounded-xl flex items-center gap-4 hover:scale-105 transition">
    <div className="bg-white/10 p-3 rounded-lg">
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value || 0}</h2>
    </div>
  </div>
);

export default Dashboard;