// Backend/src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const config = require("config");
 function authjwt(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = decoded; // Attach payload to request
        next();
    } catch (ex) {
        res.status(400).json({ error: "Invalid token." });
    }
}

module.exports = authjwt;
