import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import { generateTokens } from "../utils/token.js";

export const signUp = async (req, res,next) => {
    const {fname, lname, email, number, password} = req.body;
    if(!fname || !lname || !email || !number || !password){
       return next(errorHandler(400, "All fields are required"));
    }
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new User({fname,lname,email,number,password: hashedPassword });
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

        if (!user.password) {
            return next(errorHandler(400, "User has no password"));
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        const {password: pass, ...rest} = user._doc;
        
        if (!isPasswordValid) {
            return next(errorHandler(401, "Invalid credentials"));
        }

        res.cookie("token", generateTokens(user._id.toString()), {  httpOnly: true, secure: false,  // Set to `true` in production with HTTPS
            sameSite: "lax", }).json(rest);

    } catch (error) {
        next(error);
    }
};


export const getUser = async (req, res,user) => {
    // if (!user) {
    //     return res.status(401).json({ message: "Not authorized, user not found" });
    // }

    const { fname, lname, email } = await User.findById(req.user.id).select("fname lname email");
    res.json({ fname, lname, email });
};



