const Appointment = require("../models/appointmentModel");
const Service = require("../models/serviceModel");
const userModel = require("../models/userModel");
const sendAppointmentMail = require("../config/sendAppointmentMail");


// BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
    try {
        const { serviceId, date, time, paymentType, phone } = req.body;

        const userId = req.user.id;

        if (!serviceId || !date || !time || !paymentType || !phone) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const service = await Service.findById(serviceId);

        if (!service || !service.isActive) {
            return res.status(400).json({ message: "Invalid service" });
        }

        const selectedDateTime = new Date(`${date}T${time}`);
        if (selectedDateTime < new Date()) {
            return res.status(400).json({ message: "Cannot book past time" });
        }

        // const exists = await Appointment.findOne({
        //     date,
        //     serviceId,
        //     time,
        //     status: { $in: ["pending", "accepted"] }
        // });
        const exists = await Appointment.findOne({
            serviceId,
            date,
            time,
            isActive: true
        });

        if (exists) {
            return res.status(400).json({
                message: "Slot already booked"
            });
        }

        //  GET USER
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        if (!user.phone) {
            user.phone = phone;
            await user.save();
        }

        //  CREATE APPOINTMENT
        const appointment = await Appointment.create({
            userId,
            serviceId,
            date,
            time,
            paymentType,
            amount: service.price,
            status: "pending",
            phone,
            email: user.email,
            isActive: true
        });

        res.json({
            message: "Appointment booked successfully",
            appointment,
        });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                message: "This time slot is already booked"
            });
        }

        res.status(500).json({ error: err.message });
    }
};


// GET ALL APPOINTMENTS
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("userId", "username email")
            .populate("serviceId", "name price duration")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: appointments.length,
            appointments
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET SINGLE APPOINTMENT
const getSingleAppointment = async (req, res) => {
    try {
        const userId = req.user.id;

        const appointment = await Appointment.find({ userId })
            .populate("userId", "username email")
            .populate("serviceId", "name price duration image")

        if (appointment.length === 0) {
            return res.status(404).json({
                message: "No appointments found"
            });
        }

        res.json({
            success: true,
            appointment
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// User Cancel Appointment
const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ message: "Not found" });
        }

        if (appointment.userId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        if (appointment.status !== "pending") {
            return res.status(400).json({
                message: "Only pending appointments can be cancelled"
            });
        }

        appointment.status = "cancelled";
        appointment.isActive = false;   //  Appointment False
        await appointment.save();

        res.json({
            message: "Appointment cancelled",
            appointment: id
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Admin Accept
const acceptAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ message: "Not found" });
        }

        if (appointment.status !== "pending") {
            return res.status(400).json({
                message: "Only pending appointments can be accepted"
            });
        }

        appointment.status = "accepted";
        await appointment.save();

        //  get user + service details
        const user = await userModel.findById(appointment.userId);
        const service = await Service.findById(appointment.serviceId);

        //  send email
        await sendAppointmentMail(user.email, "Appointment Accepted ", {
            username: user.username,
            serviceName: service.name,
            date: appointment.date,
            time: appointment.time,
            status: "Accepted",
            paymentType: appointment.paymentType,
            paymentStatus: appointment.paymentStatus,
            amount: appointment.amount
        });


        res.json({
            message: "Appointment accepted & email sent",
            appointment
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Admin reject
const rejectAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ message: "Not found" });
        }

        if (appointment.status !== "pending") {
            return res.status(400).json({
                message: "Only pending appointments can be rejected"
            });
        }

        appointment.status = "rejected";
        appointment.isActive = false;   // Appointment False
        await appointment.save();

        const user = await userModel.findById(appointment.userId);
        const service = await Service.findById(appointment.serviceId);

        await sendAppointmentMail(user.email, "Appointment Rejected ", {
            username: user.username,
            serviceName: service.name,
            date: appointment.date,
            time: appointment.time,
            status: "Rejected",
            paymentType: appointment.paymentType,
            paymentStatus: appointment.paymentStatus,
            amount: appointment.amount
        });

        res.json({
            message: "Appointment rejected",
            appointmentId: id
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Complete Appointment
const completeAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ message: "Not found" });
        }

        if (appointment.status !== "accepted") {
            return res.status(400).json({
                message: "Only accepted appointments can be completed"
            });
        }

        appointment.status = "completed";
        appointment.paymentStatus = "paid"
        await appointment.save();

        const user = await userModel.findById(appointment.userId);
        const service = await Service.findById(appointment.serviceId);
        
        await sendAppointmentMail(user.email, "Appointment Completed ", {
            username: user.username,
            serviceName: service.name,
            date: appointment.date,
            time: appointment.time,
            status: "Completed",
            paymentType: appointment.paymentType,
            paymentStatus: "Paid",
            amount: appointment.amount
        });

        res.json({
            message: "Appointment completed",
            appointmentId: id
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete appoinement
const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({ message: "Not found" });
        }

        if (appointment.status !== "rejected" && appointment.status !== "cancelled") {
            return res.status(400).json({
                message: "Only rejected and cancelled appointments can be deleted"
            });
        }

        await Appointment.findByIdAndDelete(id);

        res.json({
            message: "Appointment deleted successfully",
            appointmentId: id
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    bookAppointment,
    getAllAppointments,
    getSingleAppointment,
    acceptAppointment,
    rejectAppointment,
    cancelAppointment,
    completeAppointment,
    deleteAppointment
};