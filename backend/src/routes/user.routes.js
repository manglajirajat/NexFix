import { Router } from "express";
import { registerUser,logIn, logOut, getLoggedInUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(
    registerUser
)

router.route("/login").post(
    logIn
)

router.route("/logout").post(
    verifyJWT,
    logOut
)

router.route("/me").get(
    verifyJWT,
    getLoggedInUser
)

export default router;