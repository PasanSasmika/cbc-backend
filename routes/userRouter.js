import express from 'express';
import { creatUser, getUser, googleLogin, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/",creatUser)

userRouter.post("/login",loginUser)

userRouter.post("/google",googleLogin)

userRouter.get("/",getUser)

export default userRouter;