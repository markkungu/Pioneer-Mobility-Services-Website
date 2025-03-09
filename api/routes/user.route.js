import express from 'express';
import {booking, saveBooking, getBookings, getProfile, updateProfile} from '../controllers/user.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/booking',protect, booking);
router.post('/savebooking',protect, saveBooking);
router.get('/getbookings', protect, getBookings);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);


export default router;