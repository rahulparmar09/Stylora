const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadFile = require("../config/image.service")
const emailSend = require("../config/emailService")



//  Generate Token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
    );
};

// Register
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existing = await userModel.findOne({ email });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashPassword,
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

//  Get User 
const getUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await userModel
            .findById(userId)
            .select("-password");

        res.status(200).json({
            success: true,
            user,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// Update Profile
const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const { address, gender, dob, phone, } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        if (address) user.address = address;
        if (gender) user.gender = gender;
        if (dob) user.dob = dob;
        if (phone) user.phone = phone;

        if (req.file) {
            const imageUrl = await uploadFile(req.file.buffer);
            user.image = imageUrl.url;
        }


        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // generate + send OTP
        const otp = await emailSend(email);

        // save OTP in DB
        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min Time 

        await user.save();

        res.json({ msg: "OTP sent successfully" });

    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, password, otp } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // OTP check
        if (user.otp != otp) {
            return res.status(400).json({ msg: "Invalid OTP" });
        }

        // Expiry check
        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ msg: "OTP expired" });
        }

        // password check
        if (!password) {
            return res.status(400).json({ msg: "Password required" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        // clear OTP
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        res.json({ msg: "Password reset successful" });

    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

const getAllUSer = async (req, res) => {
    try {

        const user = await userModel.find({})

        res.status(200).json({
            success: true,
            user: user.length
        });


    } catch (error) {
        res.status(500).json({ msg: "Server error" });

    }
}



module.exports = { registerUser, loginUser, getUser, updateUser, sendOtp, resetPassword, getAllUSer };