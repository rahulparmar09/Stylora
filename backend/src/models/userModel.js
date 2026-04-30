const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    image: { type: String, default: " " },
    address: { type: String },
    gender: { type: String, default: 'Not Selected' },
    dob: { type: String, default: '' },
    phone: { type: String, default: '' },
    otp: { type: Number },
    otpExpiry: { type: Date }

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);