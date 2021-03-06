import React, { useEffect, useState } from 'react';
import LoginView from '../views/loginView';
import { useNavigate } from "react-router-dom";

function LoginPresenter(props) {

    const [failed, setFailed] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        props.model.connection.on("validation", (valid) => { if (valid) { setAuth(true) } else { setFailed(true) } })
        return () => { props.model.connection.off('validation'); }
    }, [props.model])

    useEffect(() => {
        if (auth) {
            setAuth(false)
            sha256(password).then((promise) => {
                props.model.setAuth(username, promise);
                navigate("/project-kebab/");
            })
        }
    }, [auth, username, password])

    function submitter() {
        setFailed(false)
        sha256(password).then((promise) => {
            props.model.connection.emit("credentials", username, promise);
        })
    }

    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    function gotoRegister() {
        navigate("/project-kebab/register/")
    }

    return (
        <LoginView
            setUsername={setUsername}
            setPassword={setPassword}
            submitter={submitter}
            failed={failed}
            gotoRegister={gotoRegister}
        />
    )
}

export default LoginPresenter;