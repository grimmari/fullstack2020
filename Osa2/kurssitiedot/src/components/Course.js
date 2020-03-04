import React from 'react'
const Header = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}
const Part = ({ part }) => {
    console.log(part)
    return (
        <p>{part.name} {part.exercises}</p>
    )

}
const Content = ({ parts }) => {
    const partRow = () => parts.map(part =>
        <Part key={part.name}
            part={part} />
    )

    return (
        <div>
            {partRow()}
        </div>

    )

}

const Total = ({ parts }) => {
    //const summa = parts[0].exercises + parts[1].exercises + parts[2].exercises
    const summa = parts.reduce((sum, value) => {
        return sum += value.exercises
    }, 0)
    return (
        <b>Total of exercises {summa}</b>
    )
}




const Courses = ({ courses }) => {
    console.log(courses)
    const rows = () => courses.map(course =>
        <ul key={course.name}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </ul>)

    return (
        <div>
            {rows()}
        </div>
    )
}






export default Courses