import {AsyncHandler} from '../utils/AsyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {uploadOnCloud} from '../utils/cloudinary.js';
import {Product} from '../models/product.model.js';

const registerProduct = AsyncHandler(async (req,res) => {
    const {name,description,price,category,subCategory,size,brand,stock,discount} = req.body;

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
        images
    });

    if(!product){
        throw new ApiError(500,'error in adding product');
    }
    
    res.status(201).json(new ApiResponse(201,product,'product added succesfully'));
})

const getProducts = AsyncHandler(async(req,res)=>{
    const {category,subCategory} = req.query;

    let data;

    if(subCategory){
        data = await Product.find({subCategory : subCategory});
    }
    else if(category){
        data = await Product.find({category : category});
    }
    else{
        data = await Product.find();
    }

    res.status(200)
    .json(new ApiResponse(200,data,`all ${category} products listed`));
})


export {registerProduct,getProducts};