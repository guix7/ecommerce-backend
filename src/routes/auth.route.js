import {Router} from 'express';
import { postRegister, postLogin } from '../controllers/auth.controller.js';
import { validateLogin, validateRegister } from '../middlewares/validateLogin.js';

const authRouter = Router();

authRouter.post('/api/register', validateRegister, postRegister);
authRouter.post('/api/login', validateLogin, postLogin);

export default authRouter;