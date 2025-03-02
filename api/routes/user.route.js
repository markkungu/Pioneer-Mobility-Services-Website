import express from 'express';
import {booking} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/booking', booking);


export default router;