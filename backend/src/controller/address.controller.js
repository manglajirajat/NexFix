import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Address } from "../models/address.model.js";

const addAdress = AsyncHandler(async (req,res) => {
    const {type,street,city,state,postalCode} = req.body;

    if(!street || !city || !state || !postalCode){
        throw new ApiError(400,"all fields are required");
    }
    const user = await User.findById(req.user._id).populate("address");

    if(user.address.length >= 5){
        throw new ApiError(400,"maximum 5 address can be added");
    }

    const existingAddress = await Address.findOne({
        user : user._id,
        type,
        street,
        city,
        state,
        postalCode,
    });

    if (existingAddress) {
        throw new ApiError(400, "same address already exists for this user");
    }

    const address = await Address.create({
        user : user._id,
        type,
        street,
        city,
        state,
        postalCode,
    })

    if(!address){
        throw new ApiError(500,"error creating address");
    }

    user.address.push(address);

    await user.save({validateBeforeSave : false})

    res.status(201).json(new ApiResponse(201,user.address,"address added successfully"));
});

const deleteAddress = AsyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id);

    if(!user){
        throw new ApiError(400,"user not exist");
    }
    const {addressToDelete} = req.body;

    if(!addressToDelete){
        throw new ApiError(400,"address to delete is required");
    }

    const addressExist = await Address.findOne({
        $and: [{ user: user._id }, { _id: addressToDelete }] 
    })

    if(!addressExist){
        throw new ApiError(400,"address not found");
    }

    const newAddress = user.address.filter((address) => address != addressToDelete);

    await Address.deleteOne({_id : addressToDelete});

    user.address = newAddress;
    await user.save({validateBeforeSave : false});

    res.status(204)
    .json(new ApiResponse(200,{},"address deleted successfully"));
})

const getAddress = AsyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id).populate("address");

    if(!user){
        throw new ApiError(400,"user not exist");
    }

    const address = user.address;

    res.status(200)
    .json(new ApiResponse(200,address,"fetched all address"));
})

const updateAddress = AsyncHandler(async (req,res) => {
    const {_id,type,street,city,state,postalCode} = req.body;

    if(!_id){
        throw new ApiError(400,"_id is required");
    }

    const address = await Address.findById(_id);

    if(!address){
        throw new ApiError(400,"address not found");
    }

    address.type = type;
    address.street = street;
    address.city = city;
    address.state = state;
    address.postalCode = postalCode;

    await address.save();

    res.status(200).json(new ApiResponse(200,address,"address updated successfully"));
})

const getAddressById = AsyncHandler(async (req,res) => {
    const {addressId} = req.body;

    if(!addressId){
        throw new ApiError(400,"addressId is required");
    }

    const address = await Address.findById(addressId);

    if(!address){
        throw new ApiError(400,"address not found");
    }

    res.status(200).json(new ApiResponse(200,address,"address found"));
})


export {addAdress,deleteAddress,getAddress,updateAddress,getAddressById};