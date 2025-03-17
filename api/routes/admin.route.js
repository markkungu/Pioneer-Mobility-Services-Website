import express from 'express';
import { confirmDelivery, getBookings, getUsers } from '../controllers/admin.controller.js';
import { adminOnly, verifyUser } from '../middleware/auth.middleware.js';


const router = express.Router();
router.get("/users", verifyUser, adminOnly, getUsers); 
router.get('/bookings', verifyUser, adminOnly, getBookings );
router.post('/confirmdelivery', verifyUser, adminOnly,confirmDelivery);


export default router;