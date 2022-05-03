const express = require('express')
const subjectController = require('../Controller/subjectController')
const router = express.Router()
// student
router.get('/', subjectController.getSubjects)
router.put('/', subjectController.joinToSubject)

// teacher
router.post('/', subjectController.createSubject)
router.delete('/:id', subjectController.deleteSubject)
module.exports = router
