const Razorpay = require("razorpay");
const Stripe = require("stripe");
const crypto = require("crypto");
const Appointment = require("../models/appointmentModel");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// CREATE RAZORPAY ORDER
const createRazorpayOrder = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        const options = {
            amount: appointment.amount * 100,
            currency: "INR",
            receipt: `rcpt_${appointment._id}`,
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            order,
            key: process.env.RAZORPAY_KEY_ID
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// VERIFY RAZORPAY PAYMENT 
const verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            appointmentId,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid signature" });
        }

        await Appointment.findByIdAndUpdate(appointmentId, {
            paymentStatus: "paid",
            paymentType: "online"
        });

        res.json({ success: true, message: "Payment verified" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// STRIPE SESSION
const createStripeSession = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "Salon Appointment",
                        },
                        unit_amount: appointment.amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/appointments?success=true",
            cancel_url: "http://localhost:5173/appointments?success=false", 
            metadata: {
                appointmentId: appointment._id.toString(),
            },
        });

        res.json({ success: true, url: session.url });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const confirmStripePayment = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        await Appointment.findByIdAndUpdate(appointmentId, {
            paymentStatus: "paid",
            paymentType: "online"
        });

        res.json({ success: true, message: "Payment confirmed" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// MARK Cash Paid (ADMIN)
const markCashPaid = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: "Not found" });
        }

        if (appointment.paymentType !== "cash") {
            return res.status(400).json({ message: "Not cash payment" });
        }

        if (appointment.paymentStatus === "paid") {
            return res.status(400).json({ message: "Already paid" });
        }

        appointment.paymentStatus = "paid";
        appointment.status = "completed";

        await appointment.save();

        res.json({ success: true });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createRazorpayOrder,
    verifyRazorpayPayment,
    createStripeSession,
    confirmStripePayment,
    markCashPaid,
};