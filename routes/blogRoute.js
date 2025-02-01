import express from 'express';
import { createBlog, getBlog } from '../controllers/blogsController.js';


const blogRoute = express.Router();

blogRoute.post("/", createBlog)
blogRoute.get("/", getBlog)



export default blogRoute;
