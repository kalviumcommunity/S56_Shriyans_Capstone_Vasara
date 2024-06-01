const mongoose = require("mongoose")
const wardrobeSchema = new mongoose.Schema({
    clothImage:{
        type:String,
    },
    category:{
        type:Array,
    },
    createOn:{
        type:Date,
        default:Date(),
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }

})

const Wardrobe = mongoose.model("wardrobes",wardrobeSchema)

module.exports=Wardrobe;
