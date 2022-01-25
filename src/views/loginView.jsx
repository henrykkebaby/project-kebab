import React from 'react';
import "../styles/loginView.css";

function LoginView(props) {
    return (
        <div className='LoginContainer'>
            <div className='Form'>
                <h1>LOG IN_</h1>
                <a className='Text'>Username:</a>
                <input className='Input' id="usernameInput" autoFocus type="text" onChange={(e) => props.setUsername(e.target.value)} onKeyPress={event => { if (event.key === 'Enter') { document.getElementById("passwordInput").focus() } }} />
                <br />
                <a className='Text'>Password:</a>
                <input className='Input' id="passwordInput" type="password" onChange={(e) => props.setPassword(e.target.value)} onKeyPress={event => { if (event.key === 'Enter') { props.submitter() } }} />
                <br />
                <button className='Button' onClick={() => props.submitter()}><a className='Text'>Log in</a></button>

                {props.failed ? <a className='Text Red'>Login failed</a> : ""}
            </div>
        </div >
    )
}

export default LoginView;