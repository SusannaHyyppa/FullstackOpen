const express = require('express')
const app = express()


const morgan = require('morgan')
morgan.token('postdata', (req) => { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postdata'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456",
        
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        

      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
      }
  ]
 
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })


app.get('/info', (req,res) => {
    const count = persons.length
    const date = new Date();
    console.log(date)
    res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
  })



  
app.post('/api/persons', (req, res) => {
    const body = req.body       
    console.log(body)

    if (!body.name || !body.number)  {
        return res.status(400).json({ 
            error: 'name or number missing' 
        })
    }

    if (!persons.every(p => p.name != body.name)) {
        return res.status(400).json({ 
            error: 'name must be unique' 
        })
    }


  
    const person = {
      name: body.name,
      number: body.number,
      id: Math.floor(Math.random() * 1000000), 
    }
  
    persons = persons.concat(person)
  
    res.json(person)
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
app.listen(PORT)
console.log(`Server running on port ${PORT}`)