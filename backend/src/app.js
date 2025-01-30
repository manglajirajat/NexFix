import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}));

import productRoute from './routes/product.routes.js';
import userRoute from './routes/user.routes.js';
import addressRoute from './routes/address.routes.js';
import cartRoute from './routes/cart.routes.js';

app.use('/api/v1/user',userRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/user',addressRoute);
app.use('/api/v1/user',cartRoute);

export default app;