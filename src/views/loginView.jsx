import React from 'react';
import "../styles/styles.css";

function LoginView(props) {
    return (
        <div style={{ position: "absolute", bottom: "0px", top: "60px", left: "0px", right: "0px", backgroundColor: "rgb(255, 250, 120)" }}>
            <div style={{ position: "absolute", border: "1px solid black", height: "600px", width: "400px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "20px" }}>
                <div><h1>LOG IN_</h1></div>
                <div>Username:</div>
                <div><input id="usernameInput" type="text" onChange={(e) => props.setUsername(e.target.value)} /></div>
                <div>Password:</div>
                <div><input id="passwordInput" type="password" onChange={(e) => props.setPassword(e.target.value)} onKeyPress={event => { if (event.key === 'Enter') { props.submitter() } }} /></div>
                <div><button onClick={() => props.submitter()}>Log in</button></div>
                <br />
                {props.failed ? <div style={{ color: "red" }}>Login failed</div> : ""}
            </div>
        </div>
    )
}

export default LoginView;