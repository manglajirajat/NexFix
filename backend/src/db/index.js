import mongoose from "mongoose";
import {DB_name} from "../constant.js";

const connectDB = async() => {
    try{
        const connectInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_name}`);
        console.log("DB connected : ", connectInstance.connection.host);
    }
    catch(err){
        console.log("DB error : ", err);
        process.exit(1);
    }
};

export {connectDB};