import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const defaultPersonList=[
{
    name: 'Arto Hellas',
    number: 5882
  },
  {
    name: 'Ari Grimm',
    number: 458994352
  },
  {
    name: 'Erja Grimm',
    number: 5882
  }
]

ReactDOM.render(<App personList={defaultPersonList}/>, document.getElementById('root'));


