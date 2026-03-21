import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema =mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:[5,"username is too small provide a large name"],
        maxlength:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:8,
    },
    refreshToken:{
        type:String
    }

},
{
    timestamps:true
})

///hash the password

UserSchema.pre("save",async function () {
  if (!this.isModified("password")) return

  this.password = await bcrypt.hash(this.password, 10);
 
});

//checking password correctness
UserSchema.methods.isPasswordCorrect = async function(password){
  return   await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
         _id:this._id,
         password:this.password,
         username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}

    )
}


UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
         _id:this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}

    )
}



const User = mongoose.model("User",UserSchema)


export {
    User
}