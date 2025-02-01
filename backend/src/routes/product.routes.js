import { Router } from 'express';
import { upload } from '../middleware/multer.js';
import { registerProduct,getProducts } from '../controller/product.controller.js';

const router = Router();

router.route("/register").post(
    upload.fields(
        [
            {name : 'displayPicture' , maxCount : 1},
            {name : 'images'}
        ]
    ),
    registerProduct
);

router.route("/get").get(
    getProducts
);

export default router;


