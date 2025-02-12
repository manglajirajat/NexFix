import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js"
import { getOrders, placeOrderViaCart } from "../controller/order.controller.js";

const router = Router();

router.route("/placeOrderViaCart").post(
    verifyJWT,
    placeOrderViaCart
)

router.route("/getOrders").get(
    verifyJWT,
    getOrders
)

export default router;