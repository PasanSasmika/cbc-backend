import express from 'express';
import { creatUser, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/",creatUser)

userRouter.post("/login",loginUser)

export default userRouter;