import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Statistic = (props) => {
    return (
        <div>
            <table >
                <tbody>
                    <tr><td>{props.caption}</td><td> {props.value} </td></tr>
                </tbody>
            </table>
        </div>
    )


}
const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    const average = (good - bad) / total
    const positive = (good / total) + " %"
    if (total === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                No feedback given
            </div>
        )
    }
    return (
        <div>
            <h1>Statistics</h1>
            <Statistic caption='good' value={good} />
            <Statistic caption='neutral' value={neutral} />
            <Statistic caption='bad' value={bad} />
            <Statistic caption='all' value={total} />
            <Statistic caption='average' value={average} />
            <Statistic caption='positive' value={positive} />

        </div>
    )
}
const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    //<button onClick={() => setGood(good + 1)}>good</button>
    return (
        <div>
            <h1>Give feedback</h1>
            <Button onClick={() => setGood(good + 1)} text='good' />
            <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
            <Button onClick={() => setBad(bad + 1)} text='bad' />
            <Statistics good={good} neutral={neutral} bad={bad} />


        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
