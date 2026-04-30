const express = require("express");
const router = express.Router();
const multer = require("multer");

const { adminLogin, addService, toggleServiceStatus, getService, deleteService, updateService } = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// Auth
router.post("/login", adminLogin);

// Services
router.post("/add", adminAuth, upload.single("image"), addService);
router.get("/get", getService);
// Toggle services
router.patch("/toggle/:id", adminAuth, toggleServiceStatus);
router.delete("/:id", adminAuth, deleteService);

// Update service
router.put("/:id", adminAuth, upload.single("image"), updateService);

module.exports = router;