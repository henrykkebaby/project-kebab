import React from 'react';
import "../styles/loginView.css";

function LoginView(props) {
    return (
        <div className='LoginContainer'>
            <div className='LoginForm'>
                <h1>LOG IN_</h1>
                <a className='LoginText'>Username:</a>
                <input className='LoginInput' id="usernameInput" autoFocus type="text" autoComplete="off" onChange={(e) => props.setUsername(e.target.value)} onKeyPress={event => { if (event.key === 'Enter') { document.getElementById("passwordInput").focus() } }} />
                <br />
                <a className='LoginText'>Password:</a>
                <input className='LoginInput' id="passwordInput" type="password" autoComplete="off" onChange={(e) => props.setPassword(e.target.value)} onKeyPress={event => { if (event.key === 'Enter') { props.submitter() } }} />
                <br />
                <button className='LoginButton' onClick={() => props.submitter()}><a className='Text'>Log in</a></button>
                {props.failed ? <a className='LoginText Red'>Login failed</a> : ""}
                <h4 className='LoginRegisterButton' onClick={() => props.gotoRegister()}>Create New Account</h4>
            </div>
        </div >
    )
}

export default LoginView;