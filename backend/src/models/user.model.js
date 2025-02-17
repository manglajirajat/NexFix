import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    contactNumber : {
        type : String,
        required : true,
    },
    address : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Address'
        }
    ],
    cart : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Cart'
    },
    userType : {
        type : String,
        enum : ["admin","user"],
        default : "user"
    },
    refreshToken : {
        type : String
    }
});

//to protect password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hashSync(this.password, 10);
       next();
    }
);

//to compare password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
};

//jwt tokens
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id: this._id,
            userType : this.userType,
            email: this.email,
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: process.env.ACCESS_DURATION}
    );
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            id: this._id,
        }, 
        process.env.REFRESH_TOKEN_SECRET, 
        {expiresIn: process.env.REFRESH_DURATION}
    );
};

export const User = mongoose.model('User',userSchema);