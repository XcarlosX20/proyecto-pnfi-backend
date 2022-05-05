const mongoose = require('mongoose')
const shortid = require('shortid')
const Subjects = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true
    },
    grade: {
      type: String,
      require: false,
      trim: true
    },
    findStudent: [String],
    students: [{ name: String, email: String, _id: mongoose.Types.ObjectId }],
    teacher: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: 'Teachers',
      trim: true
    },
    shortId: {
      type: String,
      require: true
    }
  },
  { versionKey: false }
)
Subjects.pre('save', function (next) {
  this.shortId = shortid.generate().slice(4).toLocaleLowerCase()
  next()
})
module.exports = mongoose.model('Subjects', Subjects)
