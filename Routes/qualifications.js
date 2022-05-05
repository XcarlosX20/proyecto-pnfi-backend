const express = require('express')
const router = express.Router()
const qualificationsController = require('../Controller/qualificationsController')
const { check } = require('express-validator')
router.post(
  '/',
  [check('literal', 'the literal is required').not().isEmpty()],
  qualificationsController.createQualifications
)
module.exports = router
