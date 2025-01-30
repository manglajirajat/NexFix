import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

const uploadOnCloud = async (file) => {
   try{
        if(!file){
            return null;
        }

        const uploadResult = await cloudinary.uploader.upload(file);

        fs.unlinkSync(file);
        return uploadResult;
   }
   catch(err){
        if(fs.existsSync(file)){
            fs.unlinkSync(file)
        }
        return null;
   }
}

export {uploadOnCloud}