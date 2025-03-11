import express from 'express';
import {booking, saveBooking, getBookings, getProfile, updateProfile,deleteBooking, deleteProfile} from '../controllers/user.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/booking', booking);
router.post('/savebooking', saveBooking);
router.get('/getbookings', getBookings);//, protect
router.delete('/deletebooking', deleteBooking);
router.get("/profile", getProfile);
router.put("/updateprofile", updateProfile);
router.delete("/delete", deleteProfile);


export default router;