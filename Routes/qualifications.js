const express = require('express')
const router = express.Router()
const qualificationsController = require('../Controller/qualificationsController')
const { check } = require('express-validator')
const { authTeacher, authStudent } = require('../config/Middlewares/auth')
router.post(
  '/',
  [check('literal', 'the literal is required').not().isEmpty()],
  authTeacher,
  qualificationsController.createQualifications
)
router.get(
  '/teachers',
  authTeacher,
  qualificationsController.getQualificationsTeacher
)
router.get(
  '/students',
  authStudent,
  qualificationsController.getQualificationsStudent
)

module.exports = router
