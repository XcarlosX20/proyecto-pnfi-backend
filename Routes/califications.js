const express = require('express')
const router = express.Router()
const calificationsController = require('../Controller/calificationsController')
const { check } = require('express-validator')
router.post(
  '/',
  [check('literal', 'the literal is required').not().isEmpty()],
  calificationsController.createCalification
)
module.exports = router
