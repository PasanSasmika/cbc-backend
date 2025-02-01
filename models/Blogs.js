import mongoose from "mongoose";

const blogsSchema = mongoose.Schema({
    blogId : {
        type : String,
        required: true,
        unique: true
    },

    blogTopic: {
        type : String,
        required : true
    },

    blogCatg: {
        type : String,
        required : true
    },

    Images : [
        {
            type : String
        }
    ],

    miniDesc : {
        type : String,
        required: true
    },
   desc : {
        type : String,
        required: true
    },

    date : {
        type: Date,
        default: Date.now
    }

})

const Blogs = mongoose.model("blogs", blogsSchema);

export default Blogs;