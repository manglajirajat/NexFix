import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Address } from "../models/address.model.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

const placeOrderViaCart = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(400, "User not found");
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

    const { paymentMethod } = req.body;
    if (!paymentMethod) {
        throw new ApiError(400, "Select a payment method");
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let paymentStatus = "to be collected";
        if (paymentMethod !== "cash_on_delivery") {
            // Integrate with payment gateway and set paymentStatus
            // paymentStatus = await processPayment(paymentMethod, cart.total);
            paymentStatus = "completed"; // Placeholder
        }

        const order = await Order.create([{
            user: user._id,
            items: cart.items,
            total: cart.total,
            shippingAddress: shippingAddress._id,
            paymentMethod,
            paymentStatus,
            orderStatus: "processing"
        }], { session , timestamps: true });

        cart.items = [];
        cart.total = 0;
        await cart.save({ session });

        user.orders.push(order[0]._id);
        await user.save({ validateBeforeSave: false, session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json(new ApiResponse(201, order, "Order placed successfully"));
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new ApiError(500, "Error placing order: " , error.message);
    }
});

const getOrders = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    const orders = await Order.find({ user: user._id }).populate("items.product shippingAddress");

    return res.status(200).json(new ApiResponse(200, orders,"orders fetched successfully"));
});

export { placeOrderViaCart, getOrders };