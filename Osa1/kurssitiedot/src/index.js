import React from 'react'
import ReactDOM from 'react-dom'


const Header = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}
const Part = ({part}) => {
  console.log(part)
    return (
        <p>{part.name} {part.exercises}</p>
    )

}
const Content = (props) => {
    
    return (
        <div>
            <Part part={props.parts[0]}/>
            <Part part={props.parts[1]}/>
            <Part part={props.parts[2]}/>
        </div>

    )
}
const Total=({parts})=>{
    const summa=parts[0].exercises+parts[1].exercises+parts[2].exercises
    return(
        <div>Number of exercises {summa}</div>
    )
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

//<Content parts={parts} />
//<Total parts={parts}/>

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
            
            
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))