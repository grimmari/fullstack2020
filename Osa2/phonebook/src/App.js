import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }
  if (props.type === 'info') {
    return (
      <div className="info">
        {props.message}
      </div>
    )
  } else {
    return (
      <div className="error">
        {props.message}
      </div>
    )
  }
}


const App = (props) => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  const [message, setMessage] = useState(null)



  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const personToShow = filter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  console.log(personToShow)

  const addPerson = (event) => {
    event.preventDefault()
    const result = persons.find(p => p.name === newName)

    console.log(result)
    if (result) {
      if (window.confirm(`${result.name} is allready added on phonebook, replace the number ${result.number} 
      with new one (${newNumber})?`)) {
        console.log('removing...')
        const updatePerson = ({ ...result, number: newNumber })
        personService
          .replace(result.id, updatePerson)
          .then(updateToPerson => {
            setPersons(persons.map(p => p.name === newName ? updateToPerson : p))
          })
          .catch(error => {
            setMessage({type:'error',
          message:`Person ${updatePerson.name} was already removed from server`
          })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(n => n.id !== updatePerson.id))
          })
      }



    } else {
      const personObject = {
        name: newName,
        number: newNumber

      }
      personService
        .create(personObject)
        .then(retunedPerson => {
          console.log(retunedPerson)
          setPersons(persons.concat(retunedPerson))
        })
        .then(setMessage(
          `Note '${personObject.name}' was already removed from server`
        ))
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    }

    setNewName('')
    setNewNumber('')
  }
  const deleteClickHandle = id => {

    const person = persons.find(p => p.id === id)
    console.log('Button clicked ' + person.name)
    if (window.confirm(`Are you sure that you want to delete ${person.name}?`)) {
      console.log('delete clicked')
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setMessage(
            `Person ${person.name} was already removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}   />
      
      
      <div>
        <Filter handleChange={handleFilterChange} value={filter} />
      </div>

      <h2>Add a new</h2>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personToShow} deleteClickHandle={deleteClickHandle} />

    </div>
  )

}

export default App