import express from 'express';
import { createBlog, deleteBlogs, getBlog, updateBlogs } from '../controllers/blogsController.js';


const blogRoute = express.Router();

blogRoute.post("/", createBlog)
blogRoute.get("/", getBlog)
blogRoute.delete("/:blogId", deleteBlogs)
blogRoute.put("/:blogId", updateBlogs)





export default blogRoute;
