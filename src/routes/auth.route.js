import {Router} from 'express';
import { postRegister, postLogin } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/api/register', postRegister);
authRouter.post('/api/login', postLogin);

export default authRouter;