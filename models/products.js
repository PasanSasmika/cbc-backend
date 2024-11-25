import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    lastPrice: Number
})

const Product = mongoose.model("products", productSchema)

export default Product;