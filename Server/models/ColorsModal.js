const mongoose = require("mongoose")

const ColorSchema = new mongoose.Schema({
    name: {
        type: String
      },
      color1: {
        name: {
          type: String
        },
        code: {
          type: String,
          required: true
        }
      },
      color2: {
        name: {
          type: String
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
        default: "not varified"
      },
      createdby: {
        type: String,
        required: true
      }
})

const ColorModal = mongoose.model("colors",ColorSchema)

module.exports=ColorModal;
