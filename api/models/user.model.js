import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: String,
        required: true
    },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, default: false , required: true},
}, {
    timestamps: true
})  

const User= mongoose.model('User', userSchema)

export default User;