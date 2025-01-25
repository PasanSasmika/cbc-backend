import express from 'express';
import { creatUser, googleLogin, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/",creatUser)

userRouter.post("/login",loginUser)

userRouter.post("/google",googleLogin)


export default userRouter;