import {AsyncHandler} from "../utils/AsyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

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
    const {name,email,password,contactNumber,userType} = req.body;

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

    const user = await User.create({
        name,
        email,
        password,
        contactNumber,
        userType,
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
    
    const isPasswaordCorrect = await user.isPasswaordCorrect(password);
    if(!isPasswaordCorrect){
        throw new ApiError(400,"incorrect password");
    }

    const {refreshToken,accessToken} = await generateRefreshAndAccessToken(user._id);

    const loggedUser = await User.findOne(user._id).select("-password -refreshToken");

    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(201).
    cookie(accessToken,options).
    cookie(refreshToken,options).
    json(new ApiResponse(
        201,
        {
            user : loggedUser,accessToken,refreshToken
        },
        "logged in successfully"
    ))
})

export {registerUser,logIn}