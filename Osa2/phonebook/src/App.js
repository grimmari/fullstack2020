import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'




const App = (props) => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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
      alert(`${result.name} on jo listassa`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObject))

    }
    setNewName('')
    setNewNumber('')
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
      <Persons persons={personToShow} />

    </div>
  )

}

export default App