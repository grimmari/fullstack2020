import React from 'react'

const Filter=(props)=>{
    console.log(props)
    return(
      <div>
          Find countries<input onChange={props.handleChange} value={props.value}/> 
        </div>
    )
  }
  export default Filter