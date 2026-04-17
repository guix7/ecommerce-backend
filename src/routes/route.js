import {Router} from 'express';
import auth from '../middlewares/auth.js';
import { postProducts, getProducts, getProductsById, putProducts, removeProduct } from '../controllers/controller.js';
import upload from '../middlewares/upload.js';

const router = Router();

router.post('/api/products', auth, upload.single("imagem"), postProducts);
router.get('/api/products', auth, getProducts);
router.get('/api/products/:id', auth, getProductsById);
router.put('/api/products/:id', auth, upload.single("imagem"), putProducts);
router.delete('/api/products/:id', auth, removeProduct);

export default router;