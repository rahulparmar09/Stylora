const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        req.user = decoded; 


        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            msg: "Invalid token",
        });
    }
};

module.exports = userAuth;