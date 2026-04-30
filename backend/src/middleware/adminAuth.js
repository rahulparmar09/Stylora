const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.token;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                msg: "No token provided",
            });
        }

        const decoded = jwt.verify(
            authHeader,
            process.env.JWT_SECRET_KEY
        );

        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                msg: "Access denied",
            });
        }

        req.user = decoded;

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            msg: "Invalid token",
            err: err.message
        });
    }
};

module.exports = adminAuth;