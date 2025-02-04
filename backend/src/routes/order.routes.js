import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js"
import { getoOrders, placeOrderViaCart } from "../controller/order.controller.js";

const router = Router();

router.route("/placeOrderViaCart").post(
    verifyJWT,
    placeOrderViaCart
)

router.route("/getOrders").get(
    verifyJWT,
    getoOrders
)

export default router;