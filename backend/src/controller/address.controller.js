import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Address } from "../models/address.model.js";

const addAdress = AsyncHandler(async (req,res) => {
    const {street,city,state,postalCode,isDefault} = req.body;

    if(!street,!city,!state,!postalCode){
        throw new ApiError(400,"all fields are required");
    }
    const user = req.user;

    const existingAddress = await Address.findOne({
        user: user._id,
        street,
        city,
        state,
        postalCode,
    });

    if (existingAddress) {
        throw new ApiError(400, "same address already exists for this user");
    }

    if (isDefault) {
        await Address.updateMany(
            { user: user._id, isDefault: true },
            { isDefault: false }
        );
    }

    const address = await Address.create({
        user : user._id,
        street,
        city,
        state,
        postalCode,
        isDefault
    })

    if(!address){
        throw new ApiError(500,"error creating address");
    }

    const getUser = await User.findById(user._id);

    if(!getUser){
        throw new ApiError(401,"user not exist");
    }

    getUser.address.push(address);

    await getUser.save({validateBeforeSave : false});

    const updatedUser = getUser;

    if(!updatedUser){
        throw new ApiError(401,"error adding address");
    }

    res.status(201).json(new ApiResponse(201,updatedUser,"address added successfully"));
})

export {addAdress}