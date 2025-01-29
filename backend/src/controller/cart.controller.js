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

    const items = {
        product,
        quantity,
        price
    };

    let cart = await Cart.findById(getUser.cart);

    if (cart) {
        const existingProduct = cart.items.find((item) => item.product.toString() === product);

        if(existingProduct){
            existingProduct.quantity += Number(quantity);
        }
        else{
            cart.items.push(items);
        }

        await cart.save();
        await getUser.save();

        res.status(201).json(new ApiResponse(201, cart, "Item added to existing cart"));
        return;
    }

    cart = await Cart.create({ items: [items] });

    if (!cart) {
        throw new ApiError(400, "Cannot generate cart");
    }

    getUser.cart = cart._id;
    await getUser.save({validateBeforeSave : false});

    const updatedUser = getUser;

    res.status(201)
    .json(new ApiResponse(201,cart,"added successfully"));
})

export {addInCart};