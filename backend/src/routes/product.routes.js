import { Router } from 'express';
import { upload } from '../middleware/multer.js';
import { registerProduct, getCategoryProduct, getProductDetails, getFeaturedProducts, getSubcatProduct } from '../controller/product.controller.js';

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

router.route("/getProductDetail/:product_id").get(
    getProductDetails
);

router.route("/getCategory/:category").get(
    getCategoryProduct
);

router.route("/getSubcategory/:subCategory").get(
    getSubcatProduct
);

router.route("/getfeatured").get(
    getFeaturedProducts
);

export default router;


