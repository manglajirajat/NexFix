import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OTP } from "../models/otp.model.js";
import { sendOtp } from "../utils/sendOtp.js";
import { User } from "../models/user.model.js";

const generateOTP = AsyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const existingUser = await User.findOne({ email });

    if(existingUser) {
        throw new ApiError(400, "Email already exists");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 5);

    const resendOtp = await OTP.findOne({email});
    let otpData;

    if(!resendOtp){
        otpData = await OTP.create({
            email,
            otp,
            expiry
        });
    }
    else{
        resendOtp.otp = otp;
        resendOtp.expiry = expiry;
        otpData = await resendOtp.save();
    }
    
    if (!otpData) {
        throw new ApiError(500, "OTP generation failed");
    }
    const sended = await sendOtp(email, otp);

    if(!sended) {
        OTP.deleteOne({_id : otpData._id});
        throw new ApiError(500, "OTP sending failed");
    }

    return res.status(200).json(new ApiResponse(200, otpData, "OTP generated successfully"));
});

const generateOTPforPassChange = AsyncHandler(async (req,res) => {
    const { email } = req.body;
    if (!email) {
            throw new ApiError(400, "Email is required");
        }
    
        const user = await User.findOne({ email });
    
        if(!user) {
            throw new ApiError(400, "Email does not exist");
        }
    
        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 5);
    
        const resendOtp = await OTP.findOne({email});
    
        let otpData;
        if(!resendOtp){
            otpData = await OTP.create({
                email,
                otp,
                expiry
            });
        }else{
            resendOtp.otp = otp;
            resendOtp.expiry = expiry;
            otpData = await resendOtp.save();
        }
    
        if (!otpData) {
            throw new ApiError(500, "OTP generation failed");
        }

        const sended = await sendOtp(email, otp);
        if(!sended) {
            OTP.deleteOne({_id : otpData._id});
            throw new ApiError(500, "OTP sending failed");
        }

        return res.status(200).json(new ApiResponse(200, otpData, "OTP generated successfully"));
    }
)

const verifyOTP = AsyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }

    const otpData = await OTP.findOne({ email });
    if (!otpData) {
        throw new ApiError(400, "Invalid OTP");
    }

    if (otpData.expiry < new Date()) {
        throw new ApiError(400, "OTP expired");
    }

    if (otpData.otp != otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    await OTP.deleteOne({_id : otpData._id});

    return res.status(200).json(new ApiResponse(200, null, "OTP verified successfully"));
});

export { generateOTP,generateOTPforPassChange, verifyOTP };