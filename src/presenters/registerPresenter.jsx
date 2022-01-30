import React, { useEffect, useState } from 'react';
import RegisterView from '../views/registerView';
import { useNavigate } from "react-router-dom";

function RegisterPresenter(props) {

    const [failed, setFailed] = useState(false)
    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [auth, setAuth] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        props.model.connection.on("validation", (valid) => { if (valid) { setAuth(true) } else { setFailed(true) } })
        return () => { props.model.connection.off('validation'); }
    }, [props.model])

    useEffect(() => {
        if (auth) {
            setAuth(false)
            sha256(password1).then((promise) => {
                props.model.setAuth(username, promise);
                navigate("/project-kebab/");
            })
        }
    }, [auth, username, password1])

    function submitter() {
        setFailed(false)
        if (password1 !== password2) { setFailed(true); return; }
        sha256(password1).then((promise) => {
            props.model.connection.emit("accountcreation", username, promise);
        })
    }

    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    return (
        <RegisterView
            setUsername={setUsername}
            setPassword1={setPassword1}
            setPassword2={setPassword2}
            submitter={submitter}
            failed={failed}
        />
    )
}

export default RegisterPresenter;