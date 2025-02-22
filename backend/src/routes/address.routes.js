import Router from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addAdress, deleteAddress, getAddress, updateAddress, getAddressById } from "../controller/address.controller.js";

const router = Router();

router.route("/add").post(
    verifyJWT,
    addAdress
)

router.route("/delete").post(
    verifyJWT,
    deleteAddress
)

router.route("/getAddress").get(
    verifyJWT,
    getAddress
)

router.route("/update").post(
    verifyJWT,
    updateAddress
)

router.route("/getAddressById").post(
    getAddressById
)

export default router;