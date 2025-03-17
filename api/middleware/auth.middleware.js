import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyUser = async (req, res, next) => {
    let token;
    
    console.log(req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]; // Extract token
        console.log("Extracted Token:", token);  // Debugging
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

export const verifyAdmin = async (req, res, next) => {
    let admin_token;
    
    console.log("Authorization Header:", req.headers.authorization);
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        admin_token = req.headers.authorization.split(" ")[1]; // Extract token
        console.log("Extracted Token:", admin_token);  // Debugging
        
        try {
            // Verify token and get decoded data
            const decoded = jwt.verify(admin_token, process.env.JWT_SECRET); 
            console.log("Decoded Token:", decoded);

            // Check if token contains admin privileges
            if (!decoded.isAdmin) {
                return res.status(403).json({ message: "Access denied. Admins only." });
            }

            // Attach admin details to request
            req.user = {
                email: decoded.email,
                isAdmin: decoded.isAdmin
            };
            console.log("Authenticated Admin:", req.user);

            return next(); // Proceed to next middleware
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    }

    if (!admin_token) {
        return res.status(401).json({ message: "Not authorized, no token found" });
    }
};

export const adminOnly = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

