import express from 'express';
import { createProduct, deleteProduct, getProduct } from '../controllers/productController.js';


const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProduct)
productRouter.delete("/:productId", deleteProduct)



export default productRouter;