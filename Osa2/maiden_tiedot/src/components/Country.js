import React from 'react'
const Country = ({country}) => {


    return (
     <div >
       <h2>{country.name}</h2>
       <p>capital {country.capital}</p>
       <p>population {country.population}</p>
       <ul>{country.languages.map(lang=>
       <li key={lang.iso639_1}>{lang.name}</li>)}</ul>
       <img src={country.flag} alt='lippu' width='100px'></img>

     </div>
    )
  
  }

  export default Country