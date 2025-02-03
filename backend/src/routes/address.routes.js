import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addAdress, deleteAddress, getAddress } from "../controller/address.controller.js";

const router = Router();

router.route("/add").post(
    verifyJWT,
    addAdress
)

router.route("/delete").post(
    verifyJWT,
    deleteAddress
)

router.route("/get").get(
    verifyJWT,
    getAddress
)

export default router;