import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import KebabDatabaseView from '../views/kebabDatabaseViews/kebabDatabaseView';
import { useCookies } from "react-cookie";

function KebabDatabasePresenter(props) {

    const navigate = useNavigate();

    const [database, setDatabase] = useState([])
    const [keydata, setKeydata] = useState(null)

    const [cookie] = useCookies(["username", "password"]);

    //https://localhost:8443/kebabdatabase/user=henrik&key=abcdefg&action=get&query=kokosTimer&
    //http://localhost:3024/kebabdatabase/user=henrik&key=abcdefg&action=get&query=kokosTimer&
    //http://localhost:3024/kebabdatabase/user=henrik&key=abcdefg&query=new&action=write&input=10101010100000&

    useEffect(() => {

        if (props.model.username === null) { navigate("/project-kebab/login/"); return; }
        fetch(`http://localhost:3024/kebabdatabase/user=${cookie.username}&key=${cookie.password}&action=get&`)
            .then(e => e.json())
            .then(e => {
                var tempArray = []
                Object.entries(e).map(([key, val]) => {
                    tempArray.push([key, JSON.stringify(val)])
                })
                setDatabase(tempArray)
            })

        fetch(`http://localhost:3024/kebabdatabase/user=${cookie.username}&key=${cookie.password}&action=getkey&`)
            .then(e => e.json())
            .then(e => {
                setKeydata(e)
            })
    }, [])

    return (
        <KebabDatabaseView
            database={database}
            setDatabase={setDatabase}
            keydata={keydata}
        />
    )
}

export default KebabDatabasePresenter;