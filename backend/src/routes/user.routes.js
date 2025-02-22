import { Router } from "express";
import { registerUser,logIn, logOut, getLoggedInUser,setnewPassword } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.route("/register").post(
    upload.single("image"),
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

router.route("/set-new-password").post(
    setnewPassword
)

export default router;