import express from 'express';
import { addReview, createProduct, deleteProduct, getProduct, getProductById, getProductsByCategory, getProductStats, getReviews, searchProducts, updateProduct } from '../controllers/productController.js';


const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProduct)
productRouter.get("/search/:query", searchProducts)
productRouter.delete("/:productId", deleteProduct)
productRouter.put("/:productId", updateProduct)
productRouter.get("/:productId", getProductById)
productRouter.get("/category/:category", getProductsByCategory);
productRouter.post("/:productId/review", addReview);
productRouter.get("/:productId/review", getReviews);
productRouter.get("/stats/category", getProductStats);




export default productRouter;