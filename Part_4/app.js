const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./middlewares/tokenExtractor')
const userExtractor = require('./middlewares/userExtractor')
const mongoose = require('mongoose')

mongoose.connect(config.mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



app.use(cors())
app.use(express.json())

app.use(tokenExtractor)
app.use(userExtractor)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/resets')
  app.use('/api/testing', testingRouter)
}

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
module.exports = app