import express from 'express';
import { createBlog, deleteBlogs, getBlog } from '../controllers/blogsController.js';


const blogRoute = express.Router();

blogRoute.post("/", createBlog)
blogRoute.get("/", getBlog)
blogRoute.delete("/:blogId", deleteBlogs)




export default blogRoute;
