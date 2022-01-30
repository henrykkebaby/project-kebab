import React, { useState } from 'react';

function KebabDatabaseView(props) {

    const [showKey, setShowKey] = React.useState(false)

    return (
        <div>
            <h3>KEY: {showKey ? props.keydata : "HIDDEN"}</h3>
            <button onClick={() => setShowKey(!showKey)}>{showKey ? "Hide Key" : "Show Key"}</button>

            <table>
                <tbody>
                    {props.database.map((array) => {
                        return <tr key={array[0]}>
                            <th><input type="text" placeholder={array[0]} autoComplete="off" /> : </th>
                            <td><input id={array.toString()} onChange={() => document.getElementById(array[0]).style.visibility = "visible"} onSubmit={() => console.log("sub")} type="text" placeholder={array[1]} autoComplete="off" /></td>
                            <td id={array[0]} style={{ visibility: "hidden" }}>was {array[1]}</td>
                        </tr>
                    })}

                </tbody>
            </table>
            <button onClick={() => {
                props.database.map((array) => {
                    if (document.getElementById(array.toString()).value === "") { console.log(document.getElementById(array.toString()).placeholder) }
                    else { console.log(document.getElementById(array.toString()).value) }
                })
            }}>Submit</button>
        </div>
    )
}

export default KebabDatabaseView;

/*
                    <tr>
                        <th>{Object.keys(props.database)[0]}:</th>
                    </tr>
*/