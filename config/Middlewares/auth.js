const jws = require('jsonwebtoken')
exports.authStudent = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) {
    res.status(401).json({ msg: 'invalid token' })
  }
  try {
    const cifrated = jws.verify(token, process.env.SECRET)
    req.student = cifrated.student
    next()
  } catch (error) {
    res.status(401).json({ msg: 'invalid token' })
  }
}
exports.authTeacher = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) {
    res.status(401).json({ msg: 'invalid token' })
  }
  try {
    const cifrated = jws.verify(token, process.env.SECRET)
    req.teacher = cifrated.teacher
    next()
  } catch (error) {
    res.status(401).json({ msg: 'invalid token' })
  }
}
