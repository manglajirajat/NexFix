import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js"
import { placeOrderViaCart } from "../controller/order.controller.js";

const router = Router();

router.route("/placeOrderViaCart").post(
    verifyJWT,
    placeOrderViaCart
)

export default router;