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

const updateOrderStatus = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!id) {
        throw new ApiError(404, "Order not found");
    }

    const order = await Order.findById(id);
    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    
    // Update Payment Status
        const checkPaymentStatus = {
            method: 'GET',
            headers: {
                'x-client-id': 'TEST10480256ed35a6380df1066e386d65208401',
                'x-client-secret': 'cfsk_ma_test_e94dbc2f14d6e0b297dc6fcd383f0f12_eeeac491',
                'x-api-version': '2025-01-01'
            }
        };
    
        const paymentStatus = await fetch(`https://sandbox.cashfree.com/pg/links/${id}`, checkPaymentStatus);
            
        if (!paymentStatus.ok) {
            throw new Error("An error occurred while checking payment status");
        }
    
        const paymentStatusResult = await paymentStatus.json();
    
    if (paymentStatusResult.link_status === "PAID") {
        order.paymentStatus = "completed";
        await order.save();
    }

    return res.status(200).json(new ApiResponse(200, order, "Order status updated successfully"));
});

export { placeOrderViaCart, getOrders, updateOrderStatus };

    