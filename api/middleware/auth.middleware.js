import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]; // Extract token
        console.log("Extracted Token:", token); // Debugging

        try {
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
            req.user = await User.findById(decoded).select("-password"); // Attach user to req
            console.log("Authenticated User:", req.user);
            return next(); // Move to next middleware
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token found" });
    }
};

export default protect;
