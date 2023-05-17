const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/notes')
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

app.use('/api/blogs', blogsRouter)
module.exports = app