import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addInCart,decresaQuantity,getCart,getCartViaId,removeFromCart } from "../controller/cart.controller.js";

const router = Router();

router.route("/addInCart").post(
    verifyJWT,
    addInCart
)

router.route("/removeFromCart").post(
    verifyJWT,
    removeFromCart
)

router.route("/decreseQuantity").post(
    verifyJWT,
    decresaQuantity
)

router.route("/getCart").get(
    verifyJWT,
    getCart
)

router.route("/getCartViaId").post(
    verifyJWT,
    getCartViaId
)

export default router;