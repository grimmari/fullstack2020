import React from 'react'
import Country from './Country'



const Countries = ({ countries,handleClick }) => {
  console.log(countries)
  if (countries.length > 10) return (<div>too many countries,specify another filter</div>)
  if (countries.length === 1) {
    return (<Country country={countries[0]} />)
  }

  return (
    countries.map(country =>

      <div className='list' key={country.alpha3Code}>
        {country.name}
        <button onClick={() => handleClick(country.name)}>Show</button>
      </div>

    ))
}



export default Countries