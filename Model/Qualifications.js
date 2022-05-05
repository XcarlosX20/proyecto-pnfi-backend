const mongoose = require('mongoose')
const Qualifications = mongoose.Schema(
  {
    valueObtained: {
      type: String,
      require: true,
      trim: true
    },
    grade: {
      type: String,
      require: false,
      trim: true
    },
    subject: { type: mongoose.Types.ObjectId, ref: 'Subjects', require: true },
    teacher: {
      name: String,
      email: String,
      teacherId: mongoose.Types.ObjectId
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: 'Students'
    },
    Unit: String,
    quote: {
      type: String,
      require: false,
      trim: true
    }
  },
  { versionKey: false }
)
module.exports = mongoose.model('Qualifications', Qualifications)
