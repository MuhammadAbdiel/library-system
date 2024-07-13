/* istanbul ignore file */
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGODB_DEV)
    console.log('MongoDB connected')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
