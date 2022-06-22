const express = require('express')
const { authStudent, authTeacher } = require('../config/Middlewares/auth')
const subjectController = require('../Controller/subjectController')
const router = express.Router()
// student
router.get(
  '/students/:idStudent',
  authStudent,
  subjectController.getSubjectsStudents
)
router.put('/join/:shortId', authStudent, subjectController.joinToSubject)
router.get(
  '/students/:idSubject',
  authTeacher,
  subjectController.getOneSubjectStudent
)
// teacher
router.get(
  '/teachers/:idTeacher',
  authTeacher,
  subjectController.getSubjectsTeacher
)
router.get(
  '/teachers/:idSubject',
  authTeacher,
  subjectController.getOneSubjectTeacher
)
router.post('/', authTeacher, subjectController.createSubject)
router.delete('/:id', authTeacher, subjectController.deleteSubject)
module.exports = router
