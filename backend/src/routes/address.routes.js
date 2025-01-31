import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addAdress } from "../controller/address.controller.js";

const router = Router();

router.route("/add").post(
    verifyJWT,
    addAdress
)

export default router;