import express from 'express';
import { createCustomer, creatUser, deleteuser, getAllUsers, getUser, googleLogin, loginUser, logOut } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/",creatUser)

userRouter.post("/register",createCustomer)


userRouter.post("/login",loginUser)

userRouter.post("/google",googleLogin)

userRouter.post("/logout",logOut)

userRouter.get("/",getUser)

userRouter.get("/allusers",getAllUsers)

userRouter.delete("/deleteuser/:userId",deleteuser)


export default userRouter;