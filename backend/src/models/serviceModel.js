const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
    
    image: {
      type: String,
      default: null
    },

    price: {
      type: Number,
      required: true,
    },

    topService: {
      type: Boolean,
      default: false
    },

    duration: {
      type: Number, // minutes (e.g. 30, 60)
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);