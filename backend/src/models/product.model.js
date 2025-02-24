import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    discount : {
        type: Number,
        default: 0,
        min: 0
    },
    netPrice : {
        type : Number
    },
    category : {
        type : String,
        enum : ["Hardware","Paint","Sanitary"],
        required : true,
        index : true
    },
    subCategory : {
        type : String
    },
    brand : {
        type : String,
        required : true,
        index : true
    },
    stock : {
        type : Number,
        required : true,
        default : 0,
        min : 0
    },
    isLowStock : {
        type : Boolean,
    },
    displayPicture : {
        type : String,
        required : true
    },
    images : [
        {type : String}
    ],
    badge : {
        type : String,
    },
    featured : {
        type : Boolean,
        default : false
    },
    rating : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Review'
        }
    ]
},{timestamps : true})

ProductSchema.pre('save', async function(next) {
    this.isLowStock = this.stock <= 5;
    this.netPrice = this.price - ((this.discount * this.price) / 100);

    if (this.reviews.length > 0) {
        const reviews = await mongoose.model('Review').find({ _id: { $in: this.reviews } });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        this.rating = totalRating / reviews.length;
    } else {
        this.rating = 0;
    }
    next();
});

export const Product = mongoose.model('Product',ProductSchema);