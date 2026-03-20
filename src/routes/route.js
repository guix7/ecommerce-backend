import {Router} from 'express';
import auth from '../middlewares/auth.js';
import { postProducts, getProducts, getProductsById } from '../controllers/controller.js';

const router = Router();

router.post('/api/products', auth, postProducts);
router.get('/api/products', auth, getProducts);
router.get('/api/products/:id', auth, getProductsById)

export default router;