import express from 'express';
import {booking, saveBooking} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/booking', booking);
router.post('/savebooking', saveBooking);


export default router;