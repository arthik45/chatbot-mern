import express from 'express';
import { register, login, logout, sendVerificationOtp, verifyAccount, isAuthenticated, sendPasswordResetOtp, resetPassword} from '../controllers/authController.js';



const authRouter = express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/sent-verify-otp', sendVerificationOtp);
authRouter.post('/verify-account' , verifyAccount);
authRouter.post('/is-auth',isAuthenticated)
authRouter.post('/send-reset-otp', sendPasswordResetOtp);
authRouter.post('/reset-password', resetPassword);
export default authRouter;
