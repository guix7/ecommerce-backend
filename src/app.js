import express from 'express';
import router from './routes/route.js';
import erroGlobal from './middlewares/erroGlobal.js';
import authRouter from './routes/auth.route.js';
import helmet from 'helmet'
import limiter from './middlewares/rate-limit.js';
import mongoSanitize from 'express-mongo-sanitize'
import isAdmin from './middlewares/isAdmin.js';
import adminRouter from './routes/admin.route.js';
import userRoute from './routes/user.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(helmet());
app.use(limiter);
// app.use(mongoSanitize({
//     replaceWith: '_'
// }));

app.use(express.json());

app.use(router);
app.use(authRouter);
app.use(adminRouter);
app.use(userRoute);

app.use(erroGlobal);

export default app;