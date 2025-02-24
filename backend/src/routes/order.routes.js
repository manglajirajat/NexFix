import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js"
import { getOrders, placeOrderViaCart, updateOrderStatus, getPaymentLink } from "../controller/order.controller.js";

const router = Router();

router.route("/placeOrderViaCart").post(
    verifyJWT,
    placeOrderViaCart
)

router.route("/getOrders").get(
    verifyJWT,
    getOrders
)

router.route("/updateOrderStatus/:id").get(
    verifyJWT,
    updateOrderStatus
)

router.route("/getPaymentLink/:id").get(
    verifyJWT,
    getPaymentLink
)

export default router;