import express from 'express';
import router from './routes/route.js';
import erroGlobal from './middlewares/erroGlobal.js';
import authRouter from './routes/auth.route.js';

const app = express();
app.use(express.json());
app.use(router);
app.use(authRouter);
app.use(erroGlobal);

export default app;