import { Router } from "express";
import { registerUser,logIn } from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(
    registerUser
)

router.route("/login").post(
    logIn
)

export default router;