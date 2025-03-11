import express from 'express';
import {booking, saveBooking, getBookings, getProfile, updateProfile,deleteBooking} from '../controllers/user.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/booking', booking);
router.post('/savebooking', saveBooking);
router.get('/getbookings', getBookings);//, protect
router.delete('/deletebooking', deleteBooking);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);


export default router;