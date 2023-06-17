require('dotenv').config()

const express = require('express')
const app = express()
const Person = require('./models/person')


const morgan = require('morgan')
morgan.token('postdata', (req) => { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postdata'))
app.use(express.static('build'))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => res.json(result))
})


app.get('/info', (req,res) => {
  Person.find({}).then(result => {
    const count = result.length
    const date = new Date()
    console.log(date)
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${date}</p>
      `)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  //const person = persons.find(p => p.id === id)
  Person.findById(id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    await Person.findByIdAndRemove(req.params.id)
    res.status(204).end()
    return
  } catch(error) {
    next(error)
  }
})


app.post('/api/persons', (req, res, next) => {
  const body = req.body
  console.log(body)

  if (!body.name || !body.number)  {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }


  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})