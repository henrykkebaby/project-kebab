import React from "react"
import "../styles/styles.css";
import downloadIcon from "../files/downloadIcon.png"
import trashIcon from "../files/trashIcon.png"
import folderIcon from "../files/folderIcon.png"
import fileIcon from "../files/fileIcon.jpg"
import upArrow from "../files/upArrow.png"
import openFileIcon from "../files/openFileIcon.png"

function KebabStorageView(props) {

    return (
        <div style={{ display: "flex", flexDirection: "row", position: "absolute", bottom: "0px", top: "60px", left: "0px", right: "0px" }}>
            <div style={{ flexDirection: "column", flex: "3" }}>
                {props.path === "/" ? ""
                    :
                    <div onClick={() => { props.subPath(); props.setSelectedFile(null) }} style={{ height: "50px", backgroundColor: "rgb(250, 218, 77)", marginTop: "15px", textAlign: "left", display: "flex", flexDirection: "row", cursor: "pointer" }}>
                        <img src={upArrow} height={"40px"} style={{ marginLeft: "10px", marginTop: "5px", userSelect: "none" }} />
                    </div>}
                {props.list.map((item) => {
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
                })}
                {props.list.length === 0 ? <h2 style={{ userSelect: "none", margin: "20px" }}>This Directory Is Empty</h2> : ""}
            </div>
            <div style={{ flex: "1", border: "1px lightgrey solid", float: "right", minWidth: "500px", margin: "15px", padding: "10px" }}>
                <h3 style={{ wordWrap: "break-word" }}>{props.path}</h3>
                <input id="fileUploader" type="file" multiple="multiple" onChange={(e) => props.fileUpload(e.target.files)} style={{ display: "none" }} />
                <label htmlFor="fileUploader" style={{ border: "1px grey solid", padding: "12.5px", userSelect: "none", cursor: "pointer" }}>Click to upload files here</label>
                <br />
                <input id="folderInput" type="text" style={{ marginTop: "20px", height: "40px", width: "162px" }} placeholder="Create a folder here..." onKeyPress={event => { if (event.key === 'Enter') { props.createFolder() } }} />
                <button onClick={() => props.createFolder()} style={{ height: "40px", width: "40px", cursor: "pointer" }}>+</button>
                <div style={{ marginTop: "80px", textAlign: "center" }}>
                    {props.selectedFile ?
                        <div>
                            <h2>{props.selectedFile}</h2>
                            {props.selectedFile.includes(".") ? <h3>file</h3> : <h3>folder</h3>}
                            <div style={{ flexDirection: "row", alignContent: "center" }}>
                                <img onClick={() => props.openFile(props.selectedFile)} height={"50px"} src={openFileIcon} style={{ margin: "30px", cursor: "pointer", userSelect: "none" }} />
                                {props.selectedFile.includes(".") ? <img onClick={() => props.getFile(props.selectedFile)} height={"50px"} src={downloadIcon} style={{ margin: "30px", cursor: "pointer", userSelect: "none" }} /> : ""}
                                <img onClick={() => { props.remFile(props.selectedFile); props.setSelectedFile(null) }} height={"50px"} src={trashIcon} style={{ margin: "30px", cursor: "pointer", userSelect: "none" }} />
                            </div>
                        </div>
                        :
                        <h2 style={{ userSelect: "none" }}>Nothing selected</h2>
                    }
                </div>
            </div>
        </div>
    )
}
export default KebabStorageView;