import React from 'react';
import "../../styles/styles.css"
import folderIcon from "../../files/folderIcon.png"
import fileIcon from "../../files/fileIcon.jpg"
import upArrow from "../../files/upArrow.png"
import spinnerIcon from "../../files/spinnerIcon.jpg"

function KebabStorageListView(props) {
    return (
        <div style={{ flexDirection: "column", flex: "3" }}>

            {(props.path === "/" || props.isListLoading) ? "" :
                <div onClick={() => { props.subPath(); props.setSelectedFile(null) }} style={{ height: "50px", backgroundColor: "rgb(250, 218, 77)", marginTop: "15px", textAlign: "left", display: "flex", flexDirection: "row", cursor: "pointer" }}>
                    <img src={upArrow} height={"40px"} style={{ marginLeft: "10px", marginTop: "5px", userSelect: "none" }} />
                </div>
            }

            {props.isListLoading ?

                <img src={spinnerIcon} height={"150px"} style={{ userSelect: "none", margin: "30px" }} />

                :

                props.list.map((item) => {
                    return (
                        item.toString().includes(".") ?

                            <div onClick={() => props.handleClick(item.toString())} onDoubleClick={() => props.handleDoubleClick(item.toString())} key={item} style={{ flex: "1", height: "50px", backgroundColor: "rgb(250, 218, 77)", marginTop: "15px", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "row" }}>
                                <img style={{ marginLeft: "10px", marginTop: "10px", marginRight: "15px", userSelect: "none" }} src={fileIcon} height={"35px"} onClick={() => props.getFile(item.toString())} />
                                <h2 style={{ whiteSpace: "nowrap", marginTop: "10px", userSelect: "none" }}>{item.toString()}</h2>
                            </div>

                            :

                            <div onClick={() => props.handleClick(item.toString())} onDoubleClick={() => props.handleDoubleClick(item.toString())} key={item} style={{ flex: "1", height: "50px", backgroundColor: "rgb(250, 218, 77)", marginTop: "15px", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "row" }}>
                                <img style={{ marginLeft: "10px", marginTop: "10px", marginRight: "15px", userSelect: "none" }} src={folderIcon} height={"35px"} onClick={() => props.getFile(item.toString())} />
                                <h2 style={{ whiteSpace: "nowrap", marginTop: "10px", userSelect: "none" }}>{item.toString()}</h2>
                            </div>

                    )
                })

            }
            {!props.isListLoading && props.list.length === 0 ? <h2 style={{ userSelect: "none", margin: "20px" }}>This Directory Is Empty</h2> : ""}
        </div>
    )
}

export default KebabStorageListView;


