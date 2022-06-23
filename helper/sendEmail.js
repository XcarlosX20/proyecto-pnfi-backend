const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
module.exports = async ({ from, to, subject, html }) => {
  const mailData = {
    from,
    to,
    subject,
    html
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.pnfibackend.ptts3.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    const info = await transporter.sendMail(mailData)
    return { ...info, success: true }
  } catch (error) {
    console.log(error)
  }
}
