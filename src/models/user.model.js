import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const userName=new Schema({
    userName:{
        type:String,
        index:true,
        unique:true,
        lowercase:true,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        required:true
    },
    fullName:{
        type:String,
        index:true,
        trim:true,
        required:true
    },
    avatar:{
        type:String,
        required:true,

    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
        type:Schema.Types.ObjectId,
        ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"Password required"]
    },
    refreshToken:{
        type:String
    }
},
{
timestamps:true
})

userSchema.pre("save", async function (next) {
    // 'this' = the document being saved
  
    // Check if password was changed
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, salt);
    next()
  })

  userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
  }

  userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        { _id:this._id,
          email: this.email,
          userName:this.userName,
          fullName:this.fullName
           },
           process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } 
      );
  }

  userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        { _id:this._id,
           },
           process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } 
      );
  }


export const User =mongoose.model("User",userName); 