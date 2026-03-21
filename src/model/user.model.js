import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"


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
UserSchema.pre('save',function(){
    if(!this.isModifed("password")) return 
    this.password =bcrypt.hash(this.password,10)
})

//checking password correctness
UserSchema.methods.isPasswordCorrect = async function(password){
    await bcrypt.compare(password,this.password)
}


const User = mongoose.model("User",UserSchema)


export {
    User
}