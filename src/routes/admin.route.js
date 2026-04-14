import {Router} from 'express';
import isAdmin from '../middlewares/isAdmin.js';
import { getUsers, getUserId, deleteUs, putUser } from '../controllers/admin.controller.js';
import auth from '../middlewares/auth.js';

const adminRouter = Router();

adminRouter.get('/api/admin/users', auth, isAdmin, getUsers);
adminRouter.get('/api/admin/users/:id', auth, isAdmin, getUserId);
adminRouter.delete('/api/admin/users/:id', auth, isAdmin, deleteUs);
adminRouter.patch('/api/admin/users/:id', auth, isAdmin, putUser);

export default adminRouter;