import express from 'express';
const userRouter = express.Router();
import { getUserData } from '../controllers/userController.js';
 
userRouter.get('/data',getUserData)
export default userRouter;