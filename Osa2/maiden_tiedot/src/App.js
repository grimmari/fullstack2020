import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {

  const [countries, setCountries] = useState([])

  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  const countryToShow = filter.length > 0
    ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    : countries



  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <h2>Maiden tiedot</h2>
      <div className='filter'>
        <Filter handleChange={handleFilterChange} value={filter} />
      </div>

      <div ><Countries countries={countryToShow}
        handleClick={(s) => setFilter(s)}
      /></div>

    </div>
  )

}

export default App