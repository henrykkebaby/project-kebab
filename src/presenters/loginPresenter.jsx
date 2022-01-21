import React, { useEffect, useState } from 'react';
import LoginView from '../views/loginView';
import { useNavigate } from "react-router-dom";

function LoginPresenter(props) {

    const [failed, setFailed] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        props.model.connection.on("validation", (valid) => {
            if (valid) {
                navigate("/project-kebab/");
            } else {
                props.model.setAuth("", "");
                props.model.setCookie("username", "")
                props.model.setCookie("password", "")
                setFailed(true)
            }
        })
        return () => { props.model.connection.off('validation'); }
    }, [])

    function submitter() {
        sha256(password).then((promise) => {
            props.model.connection.emit("credentials", username, promise);
            props.model.setAuth(username, promise);
            props.model.setCookie("username", username)
            props.model.setCookie("password", promise)
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
        <LoginView
            setUsername={setUsername}
            setPassword={setPassword}
            submitter={submitter}
            failed={failed}
        />
    )
}

export default LoginPresenter;