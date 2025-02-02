import Blogs from "../models/Blogs.js"
import { isAdmin } from "./userController.js"



export  function createBlog(req,res){

    if(!isAdmin(req)){
        res.json({
            message: "Please login as an admin to add blogs.!" 
        })
        return
    }

    const newBlogsData = req.body

    const blogs = new Blogs(newBlogsData)

    blogs.save().then(()=>{
        res.json({
            message: "Blog added..!"
        })
    }).catch((error)=>{
        console.log(error)
        res.status(403).json({
            message: error
        })
    })

}

export function getBlog(req,res){
    Blogs.find({}).then((blogs)=>{
        res.json(blogs)
    })
}

export function deleteBlogs(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "Please login as an admin to delete blogs.!" 
        })
        return
    }

    const blogId = req.params.blogId

    Blogs.deleteOne(
        {blogId: blogId}
    ).then(()=>{
        res.json({
            message: "Blog deleted"
        })
    }).catch((error)=>{
        res.status(403).json({
            message: error
        })
    })

}



export function updateBlogs(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "Plese login as admin to update blogs"
        })
        return
    }

    const blogId = req.params.blogId
    const newBlogsData = req.body

    Blogs.updateOne(
        {blogId : blogId},
        newBlogsData
    ).then(()=>{
        res.json({
            message: "Blog updated..!"
        })
    }).catch((error)=>{
        res.status(403).json({
            message: error
        })
    })
}
