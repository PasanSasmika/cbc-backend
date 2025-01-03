import Product from "../models/products.js";
import { isAdmin } from "./userController.js";

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