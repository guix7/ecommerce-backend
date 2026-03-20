import {Router} from 'express';
import auth from '../middlewares/auth.js';
import { postProducts, getProducts, getProductsById, putProducts, removeProduct } from '../controllers/controller.js';

const router = Router();

router.post('/api/products', auth, postProducts);
router.get('/api/products', auth, getProducts);
router.get('/api/products/:id', auth, getProductsById);
router.put('/api/products/:id', auth, putProducts);
router.delete('/api/products/:id', auth, removeProduct);

export default router;