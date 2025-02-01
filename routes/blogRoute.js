import express from 'express';
import { createBlog } from '../controllers/blogsController.js';


const blogRoute = express.Router();

blogRoute.post("/", createBlog)


export default blogRoute;
