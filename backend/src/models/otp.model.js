import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email :{
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
});

export const OTP = mongoose.model("OTP", otpSchema);
