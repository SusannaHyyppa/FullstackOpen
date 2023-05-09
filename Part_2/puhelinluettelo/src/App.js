import { useState, useEffect } from 'react'
import axios from 'axios'

import personService from './services/persons'

const baseUrl = '/api/notes'

const Number = ({ person, persons, setPersons, setMsg, setClr }) => {
  const delPerson = () => {
    if (window.confirm("Delete")) {
      personService.del(person.id)
      setPersons(persons.filter(p => p.id != person.id))
      setClr('red')
      setMsg(`Deleted ${person.name}`)
      setTimeout(() => {
        setMsg(null)
        setClr('green')
      }, 5000)
    }
  }

  return (
    <div>
      <p>{person.name} {person.number}</p>
      <button onClick={delPerson}>delete</button>
    </div>
  )
}

const Text = ({message, color}) => {
  if (message === null) {
    return null
  }

  const style =  {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    }

    return (
      <div style={style}>
        {message}
      </div>
      
    )
}

const Filter = ({value, change}) => {
  return (
    <form>
      filter shown with 
      <input 
        value={value}
        onChange={change}
        /> 
    </form> 
  )
}

const Person = ({add, name, changeName, num, changeNum}) => {
  return (
  <form onSubmit={add}> 
    name: <input 
    value={name}
    onChange={changeName}
    />
    number: <input
    value={num}
    onChange={changeNum}
    />
    <button type="submit">add</button>
  </form>
  )
}

const Persons = ({filter, setPersons, setMsg, setClr}) => {
  return(
  filter.map(person => { 
    return(
      <Number 
        key={person.name}
        person={person}
        persons={filter}
        setPersons={setPersons}
        setMsg={setMsg}
        setClr={setClr}
      />
    )
  })
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [color, setColor] = useState('green')

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.every(object => object.name != newName)) {
      if(window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name == newName )
        person.number = newNum
        personService.update(person.id, person)
          .then(response => {
            setPersons(persons.map(p => p.id !== person.id ? p : response.data))
            setNewName('')
            setNewName('')
            setErrorMessage(`Updated ${newName}`)
            setTimeout((() => {
              setErrorMessage(null)
            }, 5000))
          })
          .catch(error => {
            setColor('red')
            setErrorMessage(
              `Information of ${person.name} has already been removed from server `
            )
            setTimeout(() => {
              setColor('green')
              setErrorMessage(null)
            }, 5000)
        })
      }

    } else {
        const personObject = {
          name: newName,
          number: newNum
        }
        personService
        .create(personObject).then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNum('')
          setErrorMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filter = () => {
    return (persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase())))
  }

  useEffect(() => {
    personService.getAll().then(response => {
        setPersons(response.data)
      })
  }, [])

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Text message={errorMessage} color={color} /> 
      <Filter value={newFilter} change={handleFilterChange}/> 
      <h2>add a new</h2>
      <Person add={addPerson} name={newName} changeName={handleNameChange} num={newNum} changeNum={handleNumChange}/>
      <h2>Numbers</h2>
      <Persons filter={filter()} setPersons={setPersons} setClr={setColor} setMsg={setErrorMessage} />
    </div>
  )

}

export default App