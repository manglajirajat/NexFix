import {AsyncHandler} from '../utils/AsyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {uploadOnCloud} from '../utils/cloudinary.js';
import {Product} from '../models/product.model.js';

const registerProduct = AsyncHandler(async (req,res) => {
    const {name,description,price,category,size,brand,stock,discount} = req.body;

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

    // console.log(name,description,price,category,size,brand,stock,discount);
    // console.log(displayPicture);
    // console.log(images);

    const product = await Product.create({
        name,
        description,
        price,
        discount,
        category,
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

export {registerProduct};