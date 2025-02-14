import express from 'express';
import { createProduct, deleteProduct, getProduct, getProductById, getProductsByCategory, searchProducts, updateProduct } from '../controllers/productController.js';


const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProduct)
productRouter.get("/search/:query", searchProducts)
productRouter.delete("/:productId", deleteProduct)
productRouter.put("/:productId", updateProduct)
productRouter.get("/:productId", getProductById)
productRouter.get("/category/:category", getProductsByCategory);






export default productRouter;