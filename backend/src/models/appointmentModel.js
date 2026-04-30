const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    phone: {
      type: String,
      default: '',
      required: true
    },

    email: {
      type: String,
      default: '',
      required: true
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled", "completed"],
      default: "pending",
    },

    paymentType: {
      type: String,
      enum: ["online", "cash"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    amount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
);

// appointmentSchema.index({ date: 1, time: 1 }, { unique: true });
appointmentSchema.index(
  { date: 1, time: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["pending", "accepted"] }
    }
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);