const mongoose = require("mongoose")

const ColorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      color1: {
        name: {
          type: String,
          required: true
        },
        code: {
          type: String,
          required: true
        }
      },
      color2: {
        name: {
          type: String,
          required: true
        },
        code: {
          type: String,
          required: true
        }
      },
      climate: {
        type: String
      },
      mood: {
        type: String
      },
      style: {
        type: String
      },
      status: {
        type: String,
        default: "not verified"
      },
      createdby: {
        type: String,
        required: true
      },
      createOn:{
        type:Date,
        default:Date(),
    }
})

const ColorModal = mongoose.model("colors",ColorSchema)

module.exports=ColorModal;
