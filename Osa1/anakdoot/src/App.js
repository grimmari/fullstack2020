import React, { useState } from 'react'

const Anecdotes = ({anecdote ,vote }) => {
  return (
    <div>
      <h3>{anecdote}</h3>
      <p>has a {vote} vote</p>
    </div>
  )

}

const App = ({ anecdotes }) => {

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [best, setBest] = useState(0)

  const randomRow = () =>
    Math.floor(Math.random() * anecdotes.length);

  const handleVotes = () => {
    const voteChanged = [...votes]
    voteChanged[selected] += 1
    setVotes(voteChanged)
    if (voteChanged[best] < voteChanged[selected]) {
      setBest(selected)
    }
  }


  return (
    <div>
      <Anecdotes anecdote={anecdotes[selected]} vote={votes[selected]} />

      <button onClick={handleVotes}>vote</button>
      <button onClick={() => setSelected(randomRow())}>next anecdote</button>
      <Anecdotes anecdote={anecdotes[best]} vote={votes[best]} />

    </div>
  )
}

export default App;
