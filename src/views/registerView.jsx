import React from 'react';
import "../styles/registerView.css";

function RegisterView(props) {
    return (
        <div className='RegisterContainer'>
            <div className='RegisterForm'>
                <h1>Register_</h1>
                <a className='RegisterText'>Username:</a>
                <input className='RegisterInput' id="usernameInput" autoFocus type="text" autoComplete="off" onChange={(e) => props.setUsername(e.target.value)} onKeyPress={event => { if (event.key === 'Enter') { document.getElementById("passwordInput1").focus() } }} />
                <br />
                <a className='RegisterText'>Password:</a>
                <input className='RegisterInput' id="passwordInput1" type="password" autoComplete="off" onChange={(e) => props.setPassword1(e.target.value)} onKeyPress={event => { if (event.key === 'Enter') { document.getElementById("passwordInput2").focus() } }} />
                <a className='RegisterText'>Password Again:</a>
                <input className='RegisterInput' id="passwordInput2" type="password" autoComplete="off" onChange={(e) => props.setPassword2(e.target.value)} onKeyPress={event => { if (event.key === 'Enter') { props.submitter() } }} />
                <br />
                <button className='RegisterButton' onClick={() => props.submitter()}><a className='Text'>Register</a></button>

                {props.failed ? <a className='RegisterText Red'>Register failed</a> : ""}
            </div>
        </div >
    )
}

export default RegisterView;