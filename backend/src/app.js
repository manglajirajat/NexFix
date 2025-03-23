import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173", "https://nexfix.vercel.app"];
app.use(cors({
    origin : function(origin, callback){
        if(!origin) return callback(null,true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = "The CORS policy for this site does not allow access from the specified Origin.";
            return callback(new Error(msg),false);
        }
        return callback(null,true);
    },
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
import ReviewRoute from "./routes/review.routes.js";

app.use('/api/v1/user',userRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/address',addressRoute);
app.use('/api/v1/cart',cartRoute);
app.use('/api/v1/order',OrderRoute);
app.use("/api/v1/otp", otpRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/review", ReviewRoute);

export default app;