import express from 'express';
import { addProduct, listProducts, removeProduct, getProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
const productRouter = express.Router();

//add product
productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
//list products
productRouter.get('/list', listProducts);
//remove product
productRouter.post('/remove/:productId', adminAuth, removeProduct);
//get single product 
productRouter.post('/:productId', getProduct);

export default productRouter;
