const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/userAuth")
const multer = require("multer");


const { registerUser, loginUser, getUser, updateUser, sendOtp, resetPassword, getAllUSer } = require("../controllers/userController");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});


router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/update-profile", userAuth, upload.single("image"), updateUser);

router.get("/get", userAuth, getUser)
router.get("/get-all", getAllUSer)

// Forget route
router.post("/send-otp", sendOtp)
router.post("/reset-password", resetPassword)


module.exports = router;