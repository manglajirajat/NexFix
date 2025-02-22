import {AsyncHandler} from "../utils/AsyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { uploadOnCloud } from "../utils/cloudinary.js";

const generateRefreshAndAccessToken = async (userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false})

        return {accessToken,refreshToken};
    }
    catch(err){
        throw new ApiError(500,"something went wrong creating tokens")
    }
}

const registerUser = AsyncHandler(async(req,res)=>{
    const {name,email,password,contactNumber} = req.body;
    const image = req.file;

    if(!name || !email || !password || !contactNumber){
        throw new ApiError(400,"enter all fields");
    }

    const userExist = await User.findOne({email});

    if(userExist){
        throw new ApiError(400,"user already exist");
    }    

    if(password.length < 6){
        throw new ApiError(400,"password must be atleast 6 length");
    }

    let imageUrl;
    if(image){
        imageUrl = (await uploadOnCloud(image.path)).url;
    }

    const user = await User.create({
        name,
        image : imageUrl,
        email,
        password,
        contactNumber,
        cart : (await Cart.create({items : []}))._id,
    })

    if(!user){
        throw new ApiError(400,"error creating user");
    }

    const newUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(201).json(new ApiResponse(201,newUser,"user created successfully"));
})

const logIn = AsyncHandler(async (req,res) => {
    const {email , password} = req.body;

    if(!email){
        throw new ApiError(400,"email is required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(400,"user not exist");
    }
    
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(400,"incorrect password");
    }

    const {refreshToken,accessToken} = await generateRefreshAndAccessToken(user._id);

    const loggedUser = await User.findOne(user._id)
    .select("-password -refreshToken");

    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(200).
    cookie("accessToken",accessToken,options).
    cookie("refreshToken",refreshToken,options).
    json(new ApiResponse(
        200,
        {
            user : loggedUser,accessToken,refreshToken
        },
        "logged in successfully"
    ))
})

const logOut = AsyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset : {refreshToken : 1}
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    res.status(201)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"log out successfully"))
})

const getLoggedInUser = AsyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)
    .select("-password -refreshToken")
    .populate("address cart");

    if(!user){
        throw new ApiError(404,"user not found");
    }

    return res.status(200).json(new ApiResponse(200,user,"user found"));
})

const setnewPassword = AsyncHandler(async (req,res) => {
    const {email,newPassword} = req.body;

    if(!email){
        throw new ApiError(400,"email is required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(400,"user not found");
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json(new ApiResponse(200,{},"password changed successfully"));
})

export {
    registerUser,
    logIn,
    logOut,
    getLoggedInUser,
    setnewPassword
}