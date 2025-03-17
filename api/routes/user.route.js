import express from 'express';
import {booking, saveBooking, getBookings, getProfile, updateProfile,deleteBooking, deleteProfile} from '../controllers/user.controller.js';
import {verifyUser} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/booking', verifyUser, booking);
router.post('/savebooking', saveBooking);
router.get('/getbookings', verifyUser, getBookings);
router.delete('/deletebooking', deleteBooking);
router.get("/profile", verifyUser, getProfile);
router.put("/updateprofile", verifyUser, updateProfile);
router.delete("/delete", verifyUser, deleteProfile);


export default router;