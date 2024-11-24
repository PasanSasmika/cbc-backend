import express from 'express';
import { Getproduct, GetproductByName, Postproduct } from '../controllers/productController.js';

const productRouter  = express.Router();

productRouter.get("/", Getproduct)
productRouter.post("/", Postproduct)

productRouter.get("/:name",GetproductByName )


export default productRouter;