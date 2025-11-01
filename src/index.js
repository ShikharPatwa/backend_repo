import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
import connectDB from './db/index.js';
import dotenv from 'dotenv'

dotenv.config({
    path:"./.env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 4000,()=>{
        console.log(`Server is running on ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Connection Failed !!!",err)
})



// import express from 'express'
// import connectDB from './db';
// const app=express();
// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("Error:")
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     }catch(error){
//         console.log("ERROR: ",error)
//         throw error
//     }
// }) ()