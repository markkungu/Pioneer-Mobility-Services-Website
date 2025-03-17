import express from 'express';
import { signUp,signIn, signOut, createAdmin, adminSignIn, adminSignOut } from '../controllers/auth.controller.js';
import { adminOnly, verifyUser } from '../middleware/auth.middleware.js'

const router = express.Router();


router.post('/signup', signUp);
router.post('/signin', signIn);
router.get("/signout", verifyUser, signOut);
router.post('/createadmin', createAdmin);
router.post('/adminsignin', adminSignIn);
router.get("/adminsignout", verifyUser,adminOnly, adminSignOut);


export default router;