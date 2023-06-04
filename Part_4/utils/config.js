require('dotenv').config()

const PORT = 3003
//const mongoUrl = process.env.MONGODB_URI

const mongoUrl = process.env.NODE_ENV === 'test' 
  ? process.env.MONGODB_URI//process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
    mongoUrl,
    PORT
  }