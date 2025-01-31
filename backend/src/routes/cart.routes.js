import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addInCart,removeFromCart } from "../controller/cart.controller.js";

const router = Router();

router.route("/addInCart").post(
    verifyJWT,
    addInCart
)

router.route("/removeFromCart").post(
    verifyJWT,
    removeFromCart
)

export default router;