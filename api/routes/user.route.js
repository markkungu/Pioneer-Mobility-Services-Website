import express from 'express';
import {booking, saveBooking, getBookings, getProfile, updateProfile,deleteBooking, deleteProfile} from '../controllers/user.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/booking', protect, booking);
router.post('/savebooking', saveBooking);
router.get('/getbookings', protect, getBookings);
router.delete('/deletebooking', deleteBooking);
router.get("/profile", protect, getProfile);
router.put("/updateprofile", protect, updateProfile);
router.delete("/delete", protect, deleteProfile);


export default router;