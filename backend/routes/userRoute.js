import express from 'express';
import { loggedInUser, registerUser, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();
// Route for user registration
userRouter.post('/register', registerUser);
// Route for user login
userRouter.post('/login', loggedInUser);
// Route for admin login
userRouter.post('/admin', adminLogin);

export default userRouter;