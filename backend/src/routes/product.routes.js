import { Router } from 'express';
import { upload } from '../middleware/multer.js';
import { registerProduct } from '../controller/product.controller.js';

const router = Router();

router.route("/register").post(
    upload.fields(
        [
            {name : 'displayPicture' , maxCount : 1},
            {name : 'images'}
        ]
    ),
    registerProduct
)

export default router;


