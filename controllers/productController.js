import Product from "../models/products.js";
import { isAdmin, isCustomer } from "./userController.js";

export  function createProduct(req,res){

    if(!isAdmin(req)){
        res.json({
            message: "Please login as an admin to add product.!" 
        })
        return
    }

    const newProductData = req.body

    const product = new Product(newProductData)

    product.save().then(()=>{
        res.json({
            message: "Product added..!"
        })
    }).catch((error)=>{
        res.status(403).json({
            message: error
        })
    })

}

export function getProduct(req,res){
    Product.find({}).then((products)=>{
        res.json(products)
    })
}


export function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "Please login as an admin to delete product.!" 
        })
        return
    }

    const productId = req.params.productId

    Product.deleteOne(
        {productId: productId}
    ).then(()=>{
        res.json({
            message: "Product deleted"
        })
    }).catch((error)=>{
        res.status(403).json({
            message: error
        })
    })

}

export function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "Plese login as admin to update products"
        })
        return
    }

    const productId = req.params.productId
    const newProductData = req.body

    Product.updateOne(
        {productId : productId},
        newProductData
    ).then(()=>{
        res.json({
            message: "Product updated..!"
        })
    }).catch((error)=>{
        res.status(403).json({
            message: error
        })
    })
}

export async function getProductById(req,res) {

    try {
        const productId = req.params.productId

        const product = await Product.findOne({productId : productId})

        res.json(product)
    } catch (e) {
        res.status(500).json({
            e
        })
    }
    
}

export function getProductsByCategory(req, res) {
    const { category } = req.params;

    Product.find({ category }) 
        .then((products) => {
            res.json(products); 
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error fetching products by category",
                error,
            });
        });
}

export async function searchProducts(req,res){
    const query = req.params.query

    try{
        const products = await Product.find({
            $or:[
                {  productName: {$regex : query, $options : "i"  }},
                { altNames : { $elemMatch: {$regex: query, $options: "i"}}}
            ],
          })
        res.json(products)
    }catch(e){
        console.log(e)
        res.status(500).json({
            e
        })
    }
}

export async function addReview(req, res) {
    if (!isCustomer(req)) {
        return res.status(403).json({
            message: "Only customers can add reviews!"
        });
    }

    const { productId } = req.params;
    const {  comment } = req.body;

    if (!comment) {
        return res.status(400).json({
            message: "comment is required."
        });
    }

    try {
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        product.reviews.push({ comment, createdAt: new Date() });
        await product.save();

        res.json({
            message: "Review added successfully!",
            reviews: product.reviews
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error adding review", error });
    }
}