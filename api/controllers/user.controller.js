import { errorHandler } from "../utils/error.js";
import Booking from "../models/booking.model.js"; // Ensure correct model import
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const booking = async (req, res, next) => {
    try {
        console.log("Received booking request:", req.body);
        const { bookingData, paymentMethodId } = req.body;

        // ✅ Validate input fields
        if (!bookingData || !bookingData.origin || !bookingData.destination || 
            !bookingData.date || !bookingData.time || !bookingData.total_price || !paymentMethodId) {
            return next(errorHandler(400, "All booking fields and paymentMethodId are required"));
        }

        // ✅ Convert price to cents
        const amount = Math.round(bookingData.total_price * 100); // Ensure amount is in cents
        console.log("Amount in cents:", amount);

        let paymentIntent;

        try {
            // ✅ Step 1: Create PaymentIntent
            paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: "usd",
                payment_method: paymentMethodId, // Attach payment method
                confirm: true, // Auto-confirm payment
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: "never", // Prevents needing return_url
                },
            });
        } catch (stripeError) {
            console.error("Stripe PaymentIntent Error:", stripeError);
            return next(errorHandler(400, stripeError.message || "Payment failed, try again"));
        }

        // ✅ Check if payment was successful
        if (paymentIntent.status !== "succeeded") {
            return next(errorHandler(400, "Payment failed, try again"));
        }

        // ✅ Step 2: Save the booking after successful payment
        const newBooking = new Booking({
            origin: bookingData.origin,
            destination: bookingData.destination,
            date: bookingData.date,
            time: bookingData.time,
            service: bookingData.service?.id 
                ? { id: bookingData.service.id, name: bookingData.service.name, base_price: bookingData.service.base_price }
                : null, // Prevents validation error if service is missing
            distance: bookingData.distance,
            duration: bookingData.duration,
            total_price: bookingData.total_price,
        });
        

        await newBooking.save();

        // ✅ Step 3: Send success response
        res.status(201).json({
            message: "Booking created successfully",
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
            newBooking
        });
    } catch (error) {
        console.log("Error processing booking:", error);
        next(errorHandler(500, "Internal server error"));
    }
};
