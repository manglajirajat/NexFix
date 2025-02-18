import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5174",
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}));

import productRoute from './routes/product.routes.js';
import userRoute from './routes/user.routes.js';
import addressRoute from './routes/address.routes.js';
import cartRoute from './routes/cart.routes.js';
import OrderRoute from './routes/order.routes.js';
import otpRoutes from "./routes/otp.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

app.use('/api/v1/user',userRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/address',addressRoute);
app.use('/api/v1/cart',cartRoute);
app.use('/api/v1/order',OrderRoute);
app.use("/api/v1/otp", otpRoutes);
app.use("/api/v1/payment", paymentRoutes);

export default app;