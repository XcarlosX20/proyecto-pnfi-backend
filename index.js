const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config({ path: '.env' })
const conectarDB = require('./config/db')
conectarDB()
const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json({ extended: true }))
// app.use('/api/auth', require('./routes/auth'))
app.use('/api/teachers', require('./Routes/teachers'))
app.use('/api/students', require('./Routes/students'))
app.use('/api/subjects', require('./Routes/subjects'))
app.use('/api/qualifications', require('./Routes/qualifications'))

// const sendEmail = require('./helper/sendEmail')
// app.get('/', async (req, res) => {
//   const send = await sendEmail({
//     from: 'suplihogar <test@pnfibackend.ptts3.com>',
//     to: 'ptecno461@gmail.com',
//     subject: 'resumen',
//     html: '<div style="background-color: #000; padding: 2rem"><h1 style="color:#fff">Hola</h1></div><b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>'
//   })
//   if (send.success) {
//     res.status(250).json({ msg: 'enviado' })
//   }
// })
app.listen(PORT, () => {
  console.log('listen on port ' + PORT)
})
