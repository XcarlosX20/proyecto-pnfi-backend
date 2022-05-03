const express = require('express')
// const cors = require('cors')
const app = express()
require('dotenv').config({ path: '.env' })
const conectarDB = require('./config/db')
conectarDB()
const PORT = process.env.PORT || 4000
// app.use(cors())
app.use(express.json({ extended: true }))
app.use('/api/students', require('./Routes/students'))
app.use('/api/subjects', require('./Routes/subjects'))
app.listen(PORT, () => {
  console.log('listen on port ' + PORT)
})