import {Router} from 'express';
import auth from '../middlewares/auth.js';
import { getUserController, updateUserController, updatePasswordController, deleteUserController} from '../controllers/user.controller.js';

const userRoute = Router();

userRoute.get('/api/users/me', auth, getUserController);
userRoute.patch('/api/users/me', auth, updateUserController);
userRoute.patch('/api/users/me/senha', auth, updatePasswordController);
userRoute.delete('/api/users/me', auth, deleteUserController);


export default userRoute;