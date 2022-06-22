const mongoose = require('mongoose')
const Teachers = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      require: true,
      trim: true
    },
    register: {
      type: Date,
      default: Date.now()
    }
  },
  { versionKey: false }
)
module.exports = mongoose.model('Teachers', Teachers)
