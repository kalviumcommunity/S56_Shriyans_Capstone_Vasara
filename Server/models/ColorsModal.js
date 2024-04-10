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
        type: String,
        required: true
      },
      mood: {
        type: String,
        required: true
      },
      style: {
        type: String,
        required: true
      }
})

const ColorModal = mongoose.model("colors",ColorSchema)

module.exports=ColorModal;
