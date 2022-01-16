import React from 'react';

function AppbarView(props) {
    return (
        <div className='Appbar'>
            <a onClick={() => props.navigate("/")} style={{ fontSize: "30px", fontWeight: "bold", userSelect: "none", cursor: "pointer" }}> PROJECT KEBAB</a>
            <div style={{ height: "20px", width: "20px", backgroundColor: props.connectionStatus, borderRadius: "50%", display: "inline-block", float: "right", marginTop: "10px", marginRight: "10px" }}></div>
        </div>
    )
}

export default AppbarView;