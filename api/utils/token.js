import jwt from "jsonwebtoken";

export const generateTokens= (_id) =>{
    return jwt.sign({_id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    }) // uses _id to make token for verification
}