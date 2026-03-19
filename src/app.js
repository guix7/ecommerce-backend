import express from 'express';
import router from './routes/route.js';
import erroGlobal from './middlewares/erroGlobal.js';
import authRouter from './routes/auth.route.js';
import helmet from 'helmet'
import limiter from './middlewares/rate-limit.js';
import mongoSanitize from 'express-mongo-sanitize'

const app = express();

app.use(helmet());
app.use(limiter);
app.use(mongoSanitize());

app.use(express.json());

app.use(router);
app.use(authRouter);

app.use(erroGlobal);

export default app;