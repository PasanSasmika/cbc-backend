import express from 'express';
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/productController.js';


const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProduct)
productRouter.delete("/:productId", deleteProduct)
productRouter.put("/:productId", updateProduct)




export default productRouter;