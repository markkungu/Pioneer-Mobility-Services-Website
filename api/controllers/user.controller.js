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

        if (!bookingData || !paymentIntentId) {
            return next(errorHandler(400, "Missing booking data or paymentIntentId"));
        }

        // ✅ Step 1: Retrieve PaymentIntent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (!paymentIntent || paymentIntent.status !== "succeeded") {
            return next(errorHandler(400, "Payment not verified"));
        }

        // ✅ Step 2: Save booking details in MongoDB
        const newBooking = new Booking(bookingData);
        await newBooking.save();

        res.status(201).json({
            message: "Booking saved successfully!",
            booking: newBooking
        });

    } catch (error) {
        console.error("Error saving booking:", error);
        next(errorHandler(500, "Internal server error"));
    }
};
