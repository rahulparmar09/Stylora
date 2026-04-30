const express = require("express");
const router = express.Router();

const userAuth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");
const { bookAppointment, getAllAppointments, getSingleAppointment, cancelAppointment, acceptAppointment, rejectAppointment, completeAppointment, deleteAppointment } = require("../controllers/appointmentController");

// get all
router.get("/", getAllAppointments);

// User 
router.post("/", userAuth, bookAppointment);
router.get("/my", userAuth, getSingleAppointment);
router.put("/cancel/:id", userAuth, cancelAppointment);

//Admin 
router.put("/accept/:id", adminAuth, acceptAppointment);
router.put("/reject/:id", adminAuth, rejectAppointment);
router.put("/complete/:id", adminAuth, completeAppointment);
router.delete("/delete/:id", adminAuth, deleteAppointment);


module.exports = router;