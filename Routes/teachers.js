const express = require('express')
const router = express.Router()
const teacherController = require('../Controller/teacherController')
const { check } = require('express-validator')
const { authTeacher } = require('../config/Middlewares/auth')
router.post(
  '/',
  [
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'the email is required').isEmail(),
    check('password', 'the password is required').isLength({ min: 6 })
  ],
  teacherController.createTeacher
)
router.post(
  '/auth',
  [
    check('email', 'the email is required').isEmail(),
    check('password', 'the password is required').isLength({ min: 6 })
  ],
  teacherController.authTeacher
)
router.get('/', authTeacher, teacherController.getTeacher)
module.exports = router
