import React from 'react';

function Contextmenu(props) {

    return (
        <div style={{ position: "absolute", width: "100px", height: "100px", border: "1px solid black", left: props.posX, top: props.posY }}>
            hello
        </div>
    )
}

export default Contextmenu;