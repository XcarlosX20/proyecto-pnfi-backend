const Students = require('../Model/Students')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createStudent = async (req, res) => {
  // errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { email, password } = req.body
  try {
    // if email is already exists
    let student = await Students.findOne({ email })
    if (student) {
      res.status(400).json({ msg: 'This user already exists' })
    } else {
      student = new Students(req.body)
      // hash the pass
      const salt = await bcrypt.genSalt(10)
      student.password = await bcrypt.hash(password, salt)
      const payload = {
        student: {
          id: student.id
        }
      }
      jwt.sign(
        payload,
        process.env.SECRET,
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
      await student.save()
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('error')
  }
}
exports.authStudent = async (req, res) => {
  // if errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() })
  }
  const { email, password } = req.body

  try {
    // Checking if user is registered
    const student = await Students.findOne({ email })
    if (!student) {
      return res.status(400).json({ msg: 'This student does not exist' })
    }
    // checking the pass
    const passCorrect = await bcrypt.compare(password, student.password)
    if (!passCorrect) {
      return res.status(400).json({ msg: 'Password Incorrect' })
    }

    const payload = {
      student: {
        id: student.id
      }
    }
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 86400 // 1 hour
      },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (error) {
    console.log(error)
  }
}
exports.getStudent = async (req, res) => {
  try {
    const student = await Students.findById(req.student.id).select('-password')
    res.json(student)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'There was an error' })
  }
}
