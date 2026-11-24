import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema  = new mongoose.Schema({
    username:{
        type : String,
        required : [true,"Username is required"],
        unique : true,
        trim : true,
        lowercase : true
    },
    email:{
        type : String,
        required : [true,"Email is required"],
        unique : true,
        trim : true,
        lowercase : true
    },
    password:{
        type : String,
        required : [true,"Password is required"],
        unique : true,
    }
})


userSchema.pre('save',async function(){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10)
    }
})

userScheam