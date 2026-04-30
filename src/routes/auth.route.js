import {Router} from 'express';
import { postRegister, postLogin, postForgotSenha, postResetSenha } from '../controllers/auth.controller.js';
import { validateLogin, validateRegister } from '../middlewares/validateLogin.js';

const authRouter = Router();

authRouter.post('/api/register', validateRegister, postRegister);
authRouter.post('/api/login', validateLogin, postLogin);
authRouter.post('/api/forgot-password', postForgotSenha);
authRouter.post('/api/reset-password', postResetSenha);

export default authRouter;