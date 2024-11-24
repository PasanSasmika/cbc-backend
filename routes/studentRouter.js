import express from 'express';
import { studentDelete, studentGet, studentPost } from '../controllers/studentController.js';

// Creat StudentRouter

const studentRouter = express.Router();

studentRouter.get("/",studentGet )



studentRouter.post("/",studentPost)

studentRouter.delete("/", studentDelete)

export default studentRouter;