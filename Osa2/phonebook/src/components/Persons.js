import React from 'react'

const Persons = (props) => {


    return (
        props.persons.map(p =>

            <table key={p.name}>
                <tbody>
                    <tr>
                        <td>{p.name}</td>
                        <td> {p.number}</td>
                        <td><button onClick={() => props.deleteClickHandle(p.id)}>Delete</button></td>
                    </tr>

                </tbody>
            </table>

        ))

}



export default Persons