import React from 'react'

const Persons = (props) => {
    console.log(props)
    return (
        props.persons.map(p =>
            <div key={p.name}>
              {p.name} {p.number}
              </div>
    ))
}



export default Persons