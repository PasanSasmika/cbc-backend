import Product from "../models/products.js";

export function Postproduct(req,res){

    console.log(req.user)

    if(req.user == null){
        res.json({
            message: "You are not loged in"
        })

        return
    }

    if(req.user.type != "admin"){
        res.json({
            message: "You are not an admin"
        })
        return
    }

    const product = new Product(req.body)
    product.save().then(()=>{
        res.json({
            message: "Product created successfully"
        })
    }).catch (()=>{
        res.json({
            message: "Product not created successfully"
        })
    })

}

export function Getproduct(req,res){

    Product.find().then((productList)=>{
            res.json({
                list: productList
            })
    }).catch (()=>{
        res.json({
            message: "Error fetching products"
        })
    })
}

export function GetproductByName(req,res){
    const name = req.params.name;

    Product.find({name : name}).then((ProductList)=>{
        res.json({
            list: ProductList
        })
    }).catch(()=>{
        res.json({
            message: "Product Not found"
        })
    })
}