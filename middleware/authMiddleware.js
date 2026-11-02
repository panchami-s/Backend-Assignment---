const { getDB } = require("../config/db");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Token required"
            });
        }
        const db = getDB();
        const user = await db.collection("users").findOne({
            token: token
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        req.user = user;

        next();
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = authMiddleware;