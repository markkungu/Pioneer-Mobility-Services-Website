import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]; // Extract token correctly
        console.log("Extracted Token:", token); // Debugging

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

           // let user = await User.findById(decoded.id).select("-password"); // Get user without password
            //console.log(req.user)
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
