import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
  });

  const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath) return null;
        // upload file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        console.log("file is Uploaded on Cloudinary",response.url);
        return response;

    }catch(error){
        fs.unlinkSync(localFilePath)  // remove the locally saved temp fileas uploading failed
        console.log("Error: ",error)
        return null
    }
  }

  export {uploadOnCloudinary}