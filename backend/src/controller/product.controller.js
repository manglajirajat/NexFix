import {AsyncHandler} from '../utils/AsyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {uploadOnCloud} from '../utils/cloudinary.js';
import {Product} from '../models/product.model.js';

const registerProduct = AsyncHandler(async (req,res) => {
    const {name,description,price,category,subCategory,size,brand,stock,discount,badge,featured} = req.body;

    if(!name || !description || !price || !category || !size || !brand || !stock || !discount){
        throw new ApiError(400,"enter all required fields");
    }

    const localdisplayPicture = Array.isArray(req.files?.displayPicture) ? req.files?.displayPicture[0].path : null;

    if(!localdisplayPicture){
        throw new ApiError(400,'display picture is mandatory');
    }

    const displayPicture = await uploadOnCloud(localdisplayPicture);

    if(!displayPicture){
        throw new ApiError(500,'error uploading displayPicture');
    }

    let images = [];
    const localImages = req.files?.images || [];

    for (let i = 0; i < localImages.length; i++) {
        const imageUrl = await uploadOnCloud(localImages[i].path);
        images.push(imageUrl?.url);
    }

    const product = await Product.create({
        name,
        description,
        price,
        discount,
        category,
        subCategory,
        size,
        brand,
        stock,
        displayPicture : displayPicture.url,
        images,
        badge,
        featured
    });

    if(!product){
        throw new ApiError(500,'error in adding product');
    }
    
    res.status(201).json(new ApiResponse(201,product,'product added succesfully'));
});

const getProductDetails = AsyncHandler(async (req,res) =>{
    const {product_id} = req.params;

    if(!product_id){
        throw new ApiError(400,'product_id is mandatory');
    }

    const product = await Product.findById(product_id);

    if(!product){
        throw new ApiError(404,'product not found');
    }

    res.status(200).json(new ApiResponse(200,product,'product details'));
});

// get products based on category, subCategory, badge sepreately and also have a seperate route for all of them
// here is example of category endpoint and corresponding route in product.routes.js
// also have to give common name in category and subCategory in product model as navigation menu is based on this which is 
// all lower case along with - in between

// why all this to not make seprate link of all pages here it automatically fetches the data based on the category from
// data passed in url which is good practice see example when product clicked it impossible to write their route
const getProducts = AsyncHandler(async(req,res)=>{
    const {category} = req.params;

    const data = await Product.find({category});

    res.status(200)
    .json(new ApiResponse(200,data,`all ${category} products listed`));
});

const getFeaturedProducts = AsyncHandler(async(req,res)=>{
    const data = await Product.find();

    res.status(200)
    .json(new ApiResponse(200,data,'featured products listed'));
});

export {registerProduct,getProductDetails,getProducts,getFeaturedProducts};