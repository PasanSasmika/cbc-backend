import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productId : {
        type : String,
        required: true,
        unique: true
    },

    productName: {
        type : String,
        required : true
    },

    altNames: [
        {
            type: String
        }
    ],

    Images : [
        {
            type : String
        }
    ],

    price : {
        type : Number,
        required: true
    },

    lastPrice : {
        type : Number,
        required: true
    },

    stock :{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },

    description : {
        type: String,
        required: true
    },
    reviews: [
        {
            // rating: { type: Number, required: true, min: 1, max: 5 },
            comment: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]
})

const Product = mongoose.model("products", productSchema);

export default Product;