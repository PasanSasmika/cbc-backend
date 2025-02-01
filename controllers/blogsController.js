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
