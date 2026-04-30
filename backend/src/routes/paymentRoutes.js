// const express = require("express");
// const router = express.Router();

// const { createRazorpayOrder, createStripeSession, verifyRazorpayPayment, cashPaymentConfirm, markCashPaid,  stripeWebhook } = require("../controllers/paymentController");

// // online payments
// router.post("/razorpay/create", createRazorpayOrder);
// router.post("/razorpay/verify", verifyRazorpayPayment);

// router.post("/stripe/create", createStripeSession);
// router.post("/stripe/webhook", stripeWebhook);

// // cash
// router.post("/cash/confirm", cashPaymentConfirm);
// router.post("/cash/mark-paid", markCashPaid);
// module.exports = router;

const express = require("express");
const router = express.Router();

const {
    createRazorpayOrder,
    verifyRazorpayPayment,
    createStripeSession,
    confirmStripePayment,
    markCashPaid,
} = require("../controllers/paymentController");
const adminAuth = require("../middleware/adminAuth");
const userAuth = require("../middleware/userAuth");

// Razorpay
router.post("/razorpay/create", userAuth, createRazorpayOrder);
router.post("/razorpay/verify",userAuth, verifyRazorpayPayment);

// Stripe
router.post("/stripe/create",userAuth, createStripeSession);
router.post("/stripe/confirm",userAuth, confirmStripePayment);

// Cash
router.post("/cash/mark-paid",adminAuth, markCashPaid);

module.exports = router;