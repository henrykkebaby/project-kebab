import React from 'react';
import "../styles/appbarView.css";
import lockIcon from "../files/lockIcon.png"

function AppbarView(props) {
    return (
        <div className='AppbarContainer'>
            <a className='Clickable AppbarFont' onClick={() => props.navigate("/project-kebab/")}> PROJECT KEBAB</a>

            <div className='AppbarContainer RightAlign'>
                {props.username === null ?
                    <a onClick={() => props.navigate("/project-kebab/login/")} className='Clickable AppbarFont Red'>LOGIN</a>
                    :
                    <a onClick={() => props.logout()} className='Clickable AppbarFont Green'>{props.username} <img src={lockIcon} height="25px" /></a>
                }

                <div className='ConnectionIndicator' style={{ backgroundColor: props.connectionStatus }}></div>
            </div>

        </div >
    )
}

export default AppbarView;