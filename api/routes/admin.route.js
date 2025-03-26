import express from 'express';
import { confirmDelivery, getBookings, getUsers,getData } from '../controllers/admin.controller.js';
import { adminOnly, verifyUser } from '../middleware/auth.middleware.js';


const router = express.Router();
router.get("/users", verifyUser, adminOnly, getUsers); 
router.get('/bookings', verifyUser, adminOnly, getBookings );
router.post('/confirmdelivery', verifyUser, adminOnly,confirmDelivery);
router.get("/home", verifyUser, adminOnly, getData);

export default router;