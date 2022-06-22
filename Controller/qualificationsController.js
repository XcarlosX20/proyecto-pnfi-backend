const Qualifications = require('../Model/Qualifications')

exports.createQualifications = async (req, res) => {
  const qualifications = new Qualifications(req.body)
  await qualifications.save()
  res.json(qualifications)
}
exports.getQualificationsTeacher = async (req, res) => {
  const teacher = req.teacher.id
  const { student, subject } = req.query
  const qualifications = await Qualifications.find({
    teacher,
    student,
    subject
  })
  if (!qualifications.length) {
    return res
      .status(404)
      .json({ msg: "This student doesn't has any qualification" })
  }
  return res.json(qualifications)
}
exports.getQualificationsStudent = async (req, res) => {
  const studentSession = req.student.id
  const { subject, student } = req.query
  if (studentSession !== student) {
    res.status(400).json({ msg: 'ERR PERM' })
  }
  const qualifications = await Qualifications.find({
    student,
    subject
  })
  if (!qualifications.length) {
    return res
      .status(404)
      .json({ msg: "you don't have any qualification in this subject" })
  }
  res.json(qualifications)
}
