const Subjects = require('../Model/Subjects')

exports.getSubjects = async (req, res) => {
  const students = await Subjects.find({
    students: '6270852abea4ea2177680537'
  })
  console.log(students)
}

exports.createSubject = async (req, res) => {
  const newSubject = new Subjects(req.body)
  await newSubject.save()
}

exports.joinToSubject = async (req, res) => {
  const shortId = 'ickkck'
  const newUser = '6270852abea4ea2177680537'
  try {
    const subject = await Subjects.findOne({ shortId })
    if (!subject) {
      res.status(404).json({ msg: 'subject not found' })
    }
    const alreadyAdded = subject.students.some((element) => element === newUser)
    if (alreadyAdded) {
      res.status(409).json({ msg: 'already added' })
    } else {
      subject.students = [...subject.students, newUser]
      subject.save()
      res.status(202).json({ msg: 'subject accepted' })
    }
  } catch (error) {
    console.log(error)
  }
}
exports.deleteSubject = async (req, res) => {
  const subjectsToDelete = req.params.id
  await Subjects.findByIdAndRemove(subjectsToDelete)
}
