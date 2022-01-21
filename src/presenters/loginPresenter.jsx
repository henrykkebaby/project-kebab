import React, { useEffect } from 'react';
import LoginView from '../views/loginView';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function LoginPresenter(props) {

    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [cookies, setCookie] = useCookies(["username", "password"]);

    const navigate = useNavigate();

    useEffect(() => {
        props.model.connection.on("validation", (valid) => {
            if (valid) {
                navigate("/project-kebab/");
            } else {
                props.model.setAuth("", "");
                setCookie("username", "", {
                    path: "/"
                });
                setCookie("password", "", {
                    path: "/"
                });
            }
        })
        return () => { props.model.connection.off('validation'); }
    }, [])

    function submitter() {
        sha256(password).then((promise) => {
            props.model.connection.emit("credentials", username, promise);
            props.model.setAuth(username, promise);
            setCookie("username", username, {
                path: "/"
            });
            setCookie("password", promise, {
                path: "/"
            });
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
        />
    )
}

export default LoginPresenter;