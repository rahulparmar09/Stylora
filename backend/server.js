require("dotenv").config();
const express = require("express");
const cors = require("cors")

const connectDB = require("./src/config/db");

// DB connect
connectDB();

// routes
const userRoutes = require("./src/routes/userRoute");
const adminRoutes = require("./src/routes/adminRoute");
const appointmentRoutes = require("./src/routes/appointmentRoute");
const paymentRoutes = require("./src/routes/paymentRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

// API routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});