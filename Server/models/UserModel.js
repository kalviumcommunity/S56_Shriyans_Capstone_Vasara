const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        default: 'user',
        
    },
    email:{
        type:String,
        unique: true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }

})

const User = mongoose.model("authentications",userSchema)

module.exports=User;