import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
});

const cartSchema = new mongoose.Schema({
    items: [cartItemSchema],
    total: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

// Calculate total price before saving
cartSchema.pre('save', function (next) {
    this.total = this.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    next();
});

export const Cart = mongoose.model('Cart', cartSchema);