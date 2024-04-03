const mongoose = require("mongoose")
const favColors= new mongoose.Schema({
    Color1 : String,
    Color2 : String,
    Color3 : String,
    Color4 : String
})
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
    },
    Colors:favColors,
    Image: String

})

const User = mongoose.model("authentications",userSchema)

module.exports=User;