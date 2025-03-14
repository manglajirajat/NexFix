import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";

const addInCart = AsyncHandler(async (req,res) => {
    const {product,quantity,price} = req.body;
    const getUser = await User.findById(req.user._id);

    if(!getUser){
        throw new ApiError(400,"cant not get user");
    }

    if(!product || !quantity || !price){
        throw new ApiError(400,"something went wrong");
    }

    const item = {
        product,
        quantity : Number (quantity),
        price
    };

    const cart = await Cart.findById(getUser.cart);

    const existingProduct = cart.items.find((item) => item.product.toString() === product);

    if(existingProduct){
        existingProduct.quantity += item.quantity;
    }
    else{
        cart.items.push(item);
    }

    await cart.save();
    await getUser.save();

    res.status(201).json(new ApiResponse(201, cart, "Item added to cart"));
})

const removeFromCart = AsyncHandler(async (req,res) => {
    const getUser = await User.findById(req.user._id);
    const { product } = req.body;

    if(!getUser){
        throw new ApiError(400,"user not exist");
    }

    const cart = await Cart.findById(getUser.cart);

    if(!cart){
        throw new ApiError(400,"cart not found");
    }

    const existingProduct = cart.items.find((item) => item.product.toString() === product);

    cart.items = cart.items.filter((item) => item != existingProduct);

    await cart.save();
    await getUser.save({validateBeforeSave : false});

    res.status(204)
    .json(new ApiResponse(204,cart,"removed successfully"));
})

const decresaQuantity = AsyncHandler(async (req,res) => {
    const getUser = await User.findById(req.user._id);

    if(!getUser){
        throw new ApiError(400,"user not exist");
    }

    const cart = await Cart.findById(getUser.cart);

    if(!cart){
        throw new ApiError(400,"cart not found");
    }

    const existingProduct = cart.items.find((item) => item.product.toString() === req.body.product);

    if(existingProduct.quantity > 1){
        existingProduct.quantity -= 1;
    }
    else{
        cart.items = cart.items.filter((item) => item != existingProduct);
    }

    await cart.save();
    await getUser.save({validateBeforeSave : false});

    res.status(200)
    .json(new ApiResponse(200,cart,"decreased successfully"));
})

const getCart = AsyncHandler( async (req,res) => {
    const user = await User.findById(req.user._id);

    if(!user){
        throw new ApiError(400,"user not exist");
    }

    const cart = await Cart.findById(user.cart).populate("items.product" , "_id name displayPicture category price netPrice");

    if(!cart){
        throw new ApiResponse(200,{items : [], total : 0},"cart is empty");
    }

    res.status(200)
    .json(new ApiResponse(200,cart,"users cart"));
})

const getCartViaId = AsyncHandler( async(req,res) => {
    const {cartId} = req.body;

    const cart = await Cart.findById(cartId).populate("items.product", "_id name displayPicture category price netPrice");

    if(!cart){
        throw new ApiError(400,"failed to get cart");
    }

    res.status(200)
    .json(new ApiResponse(200,cart,"users cart"));    
})

export {addInCart,removeFromCart,decresaQuantity,getCart,getCartViaId};