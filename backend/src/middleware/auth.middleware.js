import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = AsyncHandler(async (req,_,next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");

        if(!token){
            throw new ApiError(401,"user not logged in");
        }
    
        const decodedToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken");
    
        if(!user){
            throw new ApiError(401,"invalid access token");
        }
    
        req.user = user;
        next();
    } 
    catch (error) {
        console.error("Verification Middleware Error:", error.message)
        throw new ApiError(401,error.message || "can't verify JWT");
    }
})