import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

import productRoute from './routes/product.routes.js';
import userRoute from './routes/user.routes.js';
import addressRoute from './routes/address.routes.js';
import cartRoute from './routes/cart.routes.js';

app.use('/api/v1/user',userRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/user',addressRoute);
app.use('/api/v1/user',cartRoute);

export default app;