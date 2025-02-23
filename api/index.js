import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import cors from "cors"; // Import CORS


dotenv.config(); 
mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to database');
  }).catch((error) => {
    console.log(error);
})

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // Allow only your frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true // Allow cookies & authorization headers
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statuscode || 500;
    const message = err.message || 'Something went wrong in the server';
    res.status(statusCode).json({message,success:false,statusCode});
})