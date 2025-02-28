import {AsyncHandler} from "../utils/AsyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError }from "../utils/ApiError.js";
import { Review } from "../models/review.model.js";
import { Product } from "../models/product.model.js";

const createReview = AsyncHandler(async (req, res) => {
    const { productId, rating, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    if(!rating || !comment) {
        throw new ApiError(400, 'Rating and comment are required');
    }

    const review = await Review.create({
        rating,
        comment,
        userId: req.user._id,
        productId: productId
    });

    product.reviews.push(review._id);
    await product.save();

    res.status(201).json(new ApiResponse('Review created', { review }));
});

export { createReview }