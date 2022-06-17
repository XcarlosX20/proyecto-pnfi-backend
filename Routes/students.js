const express = require('express')
const router = express.Router()
const studentController = require('../Controller/studentController')
const { check } = require('express-validator')
const { authStudent } = require('../config/Middlewares/auth')
router.post(
  '/',
  [
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'the email is required').isEmail(),
    check('password', 'the password is required').isLength({ min: 6 })
  ],
  studentController.createStudent
)
router.post(
  '/auth',
  [
    check('email', 'the email is required').isEmail(),
    check('password', 'the password is required').isLength({ min: 6 })
  ],
  studentController.authStudent
)
router.get('/', authStudent, studentController.getStudent)
module.exports = router
