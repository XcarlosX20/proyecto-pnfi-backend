const mongoose = require('mongoose')
const Subjects = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  students: [String],
  teacher: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'Teachers',
    trim: true
  },
  shortId: String
})
module.exports = mongoose.model('Subjects', Subjects)
