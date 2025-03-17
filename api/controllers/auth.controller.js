import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import {  generateTokens } from "../utils/token.js"; // generateAdminToken,

export const signUp = async (req, res,next) => {
    const {fname, lname, email, number, password} = req.body;
    if(!fname || !lname || !email || !number || !password){
       return next(errorHandler(400, "All fields are required"));
    }
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new User({fname,lname,email,number,password: hashedPassword, isAdmin: false });
    try { 
        await newUser.save();
        res.status(201).json({message:"User created successfully" });
    } catch (error) {
        console.log(error)
       next(error);
    }

}
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(errorHandler(400, "Email and password are required"));
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        console.log("User from DB:", user); // Debugging step


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(errorHandler(401, "Invalid credentials"));
        }

        const token = generateTokens(user._id.toString()); // Generate JWT
        const { password: pass, ...rest } = user._doc; // Remove password from response

        res.status(200).json({
            success: true,
            user: rest,
            token: `Bearer ${token}`, // Send token in response body
        });

    } catch (error) {
        next(error);
    }
};



// export const getUser = async (req, res,user) => {
//     // if (!user) {
//     //     return res.status(401).json({ message: "Not authorized, user not found" });
//     // }

//     const { fname, lname, email } = await User.findById(req.user.id).select("fname lname email");
//     res.json({ fname, lname, email });
// };

export const signOut = async (req, res) => {
    // check later if the stored details in the browser are deleted after signing out !!!!!!!
    try{
        res.clearCookie('token');
        res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
        console.error("Error signing out user:", error);
        res.status(500).json({ message: "Server error" });
    }
    }

export  const createAdmin = async (req,res) => {
    console.log(req.body)
    const {fname, lname, email, number, password} = req.body; 
    if(!fname || !lname || !email || !number || !password){
       return next(errorHandler(400, "All fields are required"));
    }
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newAdmin = new User({fname,lname,email,number,password: hashedPassword, isAdmin: true });
    try { 
        await newAdmin.save();
        res.status(201).json({message:"Admin created successfully" });
    } catch (error) {
        console.error("Error creating admin:", error);
       next(error);
    }
            
    };    

    export const adminSignIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                return next(errorHandler(400, "Email and password are required"));
            }
    
            // Find user by email and include password for verification
            const user = await User.findOne({ email }).select("+password");
            if (!user) {
                return next(errorHandler(404, "User not found"));
            }
    
            console.log("User from DB:", user); // Debugging step
    
            // Check if password is valid
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return next(errorHandler(401, "Invalid credentials"));
            }
    
            // Ensure user is an admin
            if (!user.isAdmin) {
                return next(errorHandler(403, "Access denied. Admins only."));
            }
    
            // Generate admin token
           // const token = generateAdminToken(user.email, user.isAdmin);

           const token = generateTokens(user._id.toString())
            const { password: pass, ...rest } = user._doc; // Remove password from response
    
            res.status(200).json({
                success: true,
                user: rest,
                admin_token: `${token}`, // Send token in response body
            });
    
        } catch (error) {
            next(error);
        }
    };
   // check later if the stored details in the browser are deleted after signing out !!!!!!!
    export const adminSignOut = async (req, res) => {
        try{
            res.clearCookie('admin_token');
            res.status(200).json({ message: "Admin signed out successfully" });
        } catch (error) {
            console.error("Error signing out Admin:", error);
            res.status(500).json({ message: "Server error" });
        }
        }