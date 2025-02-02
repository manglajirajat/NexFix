import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addInCart,getCart,removeFromCart } from "../controller/cart.controller.js";

const router = Router();

router.route("/addInCart").post(
    verifyJWT,
    addInCart
)

router.route("/removeFromCart").post(
    verifyJWT,
    removeFromCart
)

router.route("/getCart").get(
    verifyJWT,
    getCart
)

export default router;