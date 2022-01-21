import React from 'react';
import lockIcon from "../files/lockIcon.png"

function AppbarView(props) {
    return (
        <div className='Appbar'>
            <a onClick={() => props.navigate("/project-kebab/")} style={{ fontSize: "30px", fontWeight: "bold", userSelect: "none", cursor: "pointer" }}> PROJECT KEBAB</a>
            <div style={{ height: "20px", width: "20px", backgroundColor: props.connectionStatus, borderRadius: "50%", display: "inline-block", float: "right", marginTop: "10px", marginRight: "10px" }}></div>


            {props.model.username === "" ?
                <a onClick={() => props.navigate("/project-kebab/login/")} style={{ color: "red", fontSize: "30px", fontWeight: "bold", userSelect: "none", cursor: "pointer", float: "right", marginRight: "40px" }}>LOGIN</a>
                :
                <a onClick={() => props.logout()} style={{ color: "green", fontSize: "30px", fontWeight: "bold", userSelect: "none", cursor: "pointer", float: "right", marginRight: "40px" }}>{props.model.username} <img src={lockIcon} height="30px" /></a>
            }

        </div >
    )
}

export default AppbarView;