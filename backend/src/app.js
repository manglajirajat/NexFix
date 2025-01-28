import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';

app.use('/api/v1/user',userRoute);
app.use('/api/v1/product',productRoute);

export default app;