import Router from 'express';
import { createReview } from '../controller/review.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.route("/addReview").post(
    verifyJWT,
    createReview
)

export default router;