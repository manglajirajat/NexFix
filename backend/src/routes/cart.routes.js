import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addInCart } from "../controller/cart.controller.js";

const router = Router();

router.route("/addInCart").post(
    verifyJWT,
    addInCart
)

export default router;