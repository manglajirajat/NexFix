import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

const placeOrderViaCart = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    const cart = await Cart.findById(user.cart);
    const { paymentMethod,shippingAddress } = req.body;

    if (!shippingAddress) {
        throw new ApiError(400, "Please select shipping address");
    }

    if (paymentMethod === "cash_on_delivery") {
        orderStatus = "processing";
    }

    const order = await Order.create({
        user: user._id,
        items: cart.items,
        total: cart.total,
        shippingAddress: shippingAddress,
        paymentMethod,
    });

    cart.items = [];
    cart.total = 0;
    await cart.save();

    return res.status(201).json(new ApiResponse(201, order, "Order placed successfully"));
});

const getOrders = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    const orders = await Order.find({ user: user._id })
    .populate("items.product", "_id name displayPicture price netPrice")
    .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, orders,"orders fetched successfully"));
});

export { placeOrderViaCart, getOrders };

    