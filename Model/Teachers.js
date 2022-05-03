const mongoose = require('mongoose')
const Teachers = mongoose.Schema({
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
  },
  subjects: [{ name: String, shortId: String }]
})
module.exports = mongoose.model('Teachers', Teachers)
