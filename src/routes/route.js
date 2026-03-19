import {Router} from 'express';
import auth from '../middlewares/auth.js';
import { postProducts } from '../controllers/controller.js';

const router = Router();

router.post('/api/products', auth, postProducts);

export default router;