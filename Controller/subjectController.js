const Subjects = require('../Model/Subjects')

exports.getSubjectsStudents = async (req, res) => {
  try {
    const subjectsPerEstudent = await Subjects.find({
      findStudent: req.params.idStudent
    })
    if (!subjectsPerEstudent.length) {
      return res
        .status(404)
        .json({ msg: "you don't have subjects added", alert: 'info' })
    }
    res.status(200).json(subjectsPerEstudent)
  } catch (error) {
    console.log(error)
  }
}
exports.getSubjectsTeacher = async (req, res) => {
  const subjectsPerTeacher = await Subjects.find({
    teacher: req.params.idTeacher
  })
  if (!subjectsPerTeacher.length) {
    return res
      .status(404)
      .json({ msg: "you don't have any subject added", alert: 'info' })
  }
  res.status(200).json(subjectsPerTeacher)
}
exports.getOneSubjectStudent = async (req, res) => {
  return
}
exports.getOneSubjectTeacher = async (req, res) => {
  return
}
exports.createSubject = async (req, res) => {
  const newSubject = new Subjects(req.body)
  await newSubject.save()
  res.status(201).json({ msg: 'subject created succesfully', newSubject })
}

exports.joinToSubject = async (req, res) => {
  const { shortId } = req.params
  const newStudent = req.body
  try {
    const subject = await Subjects.findOne({ shortId })
    if (!subject) {
      res.status(404).json({ msg: 'subject not found' })
    }
    const alreadyAdded = subject.findStudent.some(
      (student) => student === newStudent._id
    )
    if (alreadyAdded) {
      res.status(409).json({ msg: 'this user is already added!' })
    } else {
      await Subjects.findOneAndUpdate(
        { shortId },
        {
          findStudent: [...subject.findStudent, newStudent._id],
          students: [...subject.students, newStudent]
        }
      )
      res.status(202).json({ msg: 'subject added' })
    }
  } catch (error) {
    console.log(error)
  }
}
exports.deleteSubject = async (req, res) => {
  const subjectsToDelete = req.params.id
  await Subjects.findByIdAndRemove(subjectsToDelete)
  res.json({ msg: 'subject deleted' })
}
