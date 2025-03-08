import express from 'express';
import { signUp,signIn, getUser } from '../controllers/auth.controller.js';
import protect from '../middleware/auth.middleware.js'

const router = express.Router();


router.post('/signup', signUp);
router.post('/signin', signIn);
//router.get('/getUser', protect, getUser);

export default router;