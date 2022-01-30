import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import redLockIcon from "../files/redLockIcon.png"
import lockIcon from "../files/lockIcon.png"

function Admin(props) {

    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {

        if (props.model.username === null) { navigate("/project-kebab/login/"); return; }

        props.model.connection.emit("getAdmin")

        props.model.connection.on("gotAdmin", (bool) => {
            setIsAdmin(bool)
        })

        return () => {
            props.model.connection.off('gotAdmin');
        }
    }, [])

    function disableAC() {
        props.model.connection.emit("admin_disableAC")
    }

    function enableAC() {
        props.model.connection.emit("admin_enableAC")
    }

    return (
        <div>

            {isAdmin === false &&
                <div onClick={() => navigate("/project-kebab/")} style={{ position: "absolute", top: "1.5cm", bottom: "0px", left: "0px", right: "0px", backgroundColor: "rgb(255, 100, 100)", userSelect: "none" }}>
                    <div style={{ display: "flex", justifyContent: "center", textAlign: "center", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -100%)" }}>
                        <h1>NOT AN ADMIN ACCOUNT</h1>
                        <img height={90} src={redLockIcon} style={{ marginLeft: "40px" }} />
                    </div>
                    <h4 style={{ position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, 0)", color: "rgb(80, 80, 80)" }}>if this is wrong contact system administrator</h4>

                </div >}

            {isAdmin === null &&
                <div onClick={() => navigate("/project-kebab/")} style={{ position: "absolute", top: "1.5cm", bottom: "0px", left: "0px", right: "0px", backgroundColor: "rgb(255, 255, 100)", userSelect: "none" }}>
                    <div style={{ display: "flex", justifyContent: "center", textAlign: "center", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -100%)" }}>
                        <h1>Loading...</h1>
                    </div>
                </div >}

            {isAdmin === true &&
                <div style={{ position: "absolute", top: "1.5cm", bottom: "0px", left: "0px", right: "0px", backgroundColor: "rgb(100, 255, 100)", userSelect: "none" }}>
                    <div style={{ display: "flex", justifyContent: "center", textAlign: "center", position: "absolute", left: "50%", top: "1.5cm", transform: "translate(-50%, -100%)" }}>
                        <button onClick={() => enableAC()} style={{ backgroundColor: "rgb(200,255,200)" }}>Enable account creation</button>
                        <button onClick={() => disableAC()} style={{ backgroundColor: "rgb(255,200,200)" }}>Disable account creation</button>
                    </div>
                </div >}

        </div>

    )
}

export default Admin;