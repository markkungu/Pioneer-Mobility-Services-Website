import { errorHandler } from "../utils/error.js";
import Booking from "../models/booking.model.js"; // Ensure correct model import
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const booking = async (req, res, next) => {
    try {
        const { bookingData } = req.body;

        // ✅ Validate input fields
        if (!bookingData || !bookingData.origin || !bookingData.destination || 
            !bookingData.date || !bookingData.time || !bookingData.total_price ) {
            return next(errorHandler(400, "All booking fields are required"));
        }

        // ✅ Convert price to cents
        const amount = Math.round(bookingData.total_price * 100); 

        let paymentIntent;
        try {
            // ✅ Step 1: Create PaymentIntent
            paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: "usd",
                automatic_payment_methods: {
                    enabled: true,  
                },
            });
        } catch (stripeError) {
            console.error("Stripe PaymentIntent Error:", stripeError);
            return next(errorHandler(400, stripeError.message || "Payment failed, try again"));
        }

        // ✅ Send clientSecret to frontend for confirmation
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id, // Send PaymentIntent ID for verification
        });

    } catch (error) {
        console.log("Error processing booking:", error);
        next(errorHandler(500, "Internal server error"));
    }
};

export const saveBooking = async (req, res, next) => {
    try {
        const { bookingData, paymentIntentId } = req.body;

        // ✅ Ensure required data is provided
        if (!bookingData || !paymentIntentId) {
            return next(errorHandler(400, "Missing booking data or paymentIntentId"));
        }

        // ✅ Retrieve PaymentIntent from Stripe for verification
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (!paymentIntent || paymentIntent.status !== "succeeded") {
            return next(errorHandler(400, "Payment not verified"));
        }

        // ✅ Ensure `total_price` is stored as a number
        bookingData.total_price = parseFloat(bookingData.total_price);

        // ✅ Save booking details in MongoDB
        const newBooking = new Booking({
            userId: bookingData.userId || null, // Ensure user ID is included
            userName: bookingData.userName || "Guest",
            origin: bookingData.origin,
            destination: bookingData.destination,
            distance: bookingData.distance,
            duration: bookingData.duration,
            service: bookingData.service,
            date: bookingData.date,
            time: bookingData.time,
            total_price: bookingData.total_price,
            paymentIntentId: paymentIntent.id, // Store paymentIntentId for reference
        });

        await newBooking.save();

        res.status(201).json({
            message: "✅ Booking saved successfully!",
            booking: newBooking,
        });

    } catch (error) {
        console.error("❌ Error saving booking:", error);
        next(errorHandler(500, "Internal server error"));
    }
};



export const getBookings = async (req, res, next) => {
    if (req.user.id === req.query.id) {
        // console.log(req.user.id, req.query.id);
        
        try {
    
          // Find all bookings where `userId` matches the given ID
          const bookings = await Booking.find({ userId: req.query.id });
      console.log(bookings);
          if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" });
          }
      
          res.status(200).json(bookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          res.status(500).json({ message: "Server error" });
        }
    }
    else{
        return next(errorHandler(401, "you can only view your own bookings"));
    }
};


export const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password"); // Exclude password
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // UPDATE user profile
  export const updateProfile = async (req, res) => {
    try {
      const { firstName, lastName, phone, password } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { firstName, lastName, phone, password },
        { new: true }
      );
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to update profile" });
    }
  };
