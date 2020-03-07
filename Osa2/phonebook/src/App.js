import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'




const App = (props) => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
        const updatePerson = ({ ...result, number: newNumber })
        personService
        .replace(result.id,updatePerson)
        .then(updateToPerson => {
            setPersons(persons.map(p => p.name === newName ? updateToPerson : p))
          })}



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

    }
    setNewName('')
    setNewNumber('')
  }
  const deleteClickHandle = id => {

    const person = persons.find(p => p.id === id)
    console.log('Button clicked ' + person.name)
    if (window.confirm(`Are you sure that you want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
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