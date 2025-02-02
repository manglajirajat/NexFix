import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Address } from "../models/address.model.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

const placeOrderViaCart = AsyncHandler( async (req,res) => {
    const user = await User.findById(req.user._id);

    if(!user){
        throw new ApiError(400,"user not exisit");
    }

    const cart = await Cart.findById(user.cart);

    if (!cart || !cart.items || cart.items.length === 0) {
        throw new ApiError(400, "No products found in the cart");
    }

    const shippingAddress = await Address.findOne({
        _id: { $in: user.address },
        isDefault: true
    });

    if (!shippingAddress) {
        throw new ApiError(400, "Please add a default shipping address");
    }

    const {paymentMethod} = req.body;

    if(!paymentMethod){
        throw new ApiError(400,"select payment method");
    }

    let order;
    if(paymentMethod == "cash_on_delivery"){
        order = await Order.create({
            name : user.name,
            contactNumber : user.contactNumber,
            items : cart.items,
            total : cart.total,
            shippingAddress : shippingAddress._id,
            paymentMethod,
            paymentStatus : "to be collected",
            orderStatus : "processing"
        })

        if(!order){
            throw new ApiError(400,"error placing order");
        }

        cart.items = [];
        cart.total = 0;
        await cart.save();

        user.orders.push(order._id);
        await user.save({validateBeforeSave : false});
        
        return res.status(201).json(new ApiResponse(201,order,"order placed successfully"));
    }

    // const paymentStatus = await //online payment gateway

    if(paymentStatus == "failed"){
        throw new ApiError(400,"payment failed");
    }

    order = await Order.create({
        name : user.name,
        contactNumber : user.contactNumber,
        items : cart.items,
        total : cart.total,
        shippingAddress : shippingAddress._id,
        paymentMethod,
        paymentStatus,
        orderStatus : "processing"
    });

    cart.items = [];
    cart.total = 0;
    await cart.save();

    user.orders.push(order._id);
    await user.save({validateBeforeSave : false});
        
    return res.status(201).json(new ApiResponse(201,order,"order placed successfully"));
})

// const placeOrder = AsyncHandler ( async (req,res) = {

// })

export {
    placeOrderViaCart
}