const Teachers = require('../Model/Teachers')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createTeacher = async (req, res) => {
  // errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  const { email, password } = req.body
  try {
    // if email is already exists
    let teacher = await Teachers.findOne({ email })
    if (teacher) {
      res.status(400).json({ msg: 'This teacher already exists' })
    } else {
      teacher = new Teachers(req.body)
      // hash the pass
      const salt = await bcrypt.genSalt(10)
      teacher.password = await bcrypt.hash(password, salt)
      await teacher.save()
      const payload = {
        teacher: {
          id: teacher.id
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
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('error')
  }
}
exports.authTeacher = async (req, res) => {
  // if errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() })
  }
  const { email, password } = req.body

  try {
    // Checking if user is registered
    const teacher = await Teachers.findOne({ email })
    if (!teacher) {
      return res.status(400).json({ msg: 'This teacher does not exist' })
    }
    // checking the pass
    const passCorrect = await bcrypt.compare(password, teacher.password)
    if (!passCorrect) {
      return res.status(400).json({ msg: 'Password Incorrect' })
    }

    const payload = {
      teacher: {
        id: teacher.id
      }
    }
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 86400 // 24 hour
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
exports.getTeacher = async (req, res) => {
  try {
    const teacher = await Teachers.findById(req.teacher.id).select('-password')
    res.json(teacher)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'There was an error' })
  }
}
