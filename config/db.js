const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL)
    console.log('DB connected')
  } catch (error) {
    console.log(error)
  }
}
module.exports = connectDB
