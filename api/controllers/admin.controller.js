import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";

// ✅ Get All Users (Admin Only)
export const getUsers = async (req, res, next) => {
    try {
        // Ensure only admins can access
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Fetch all users except passwords
        const users = await User.find().select("-password");

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getBookings = async (req, res, next) => {
    try {
        // Ensure only admins can access
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Fetch all bookings
        const bookings = await Booking.find();

        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

// ✅ Confirm Delivery
export const confirmDelivery = async (req, res, next) => {
    try {
        const bookingId  = req.query.id; // Expecting the booking ID in request body

        if (!bookingId) {
            return res.status(400).json({ message: "Booking ID is required." });
        }

        // Find the booking and update status
        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { status: "Delivered" },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        res.status(200).json({ message: "Delivery confirmed.", booking });
    } catch (error) {
        next(error);
    }
};

