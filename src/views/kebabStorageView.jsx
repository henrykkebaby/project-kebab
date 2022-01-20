import React from "react"
import "../styles/styles.css";
import downloadIcon from "../files/downloadIcon.png"
import trashIcon from "../files/trashIcon.png"
import folderIcon from "../files/folderIcon.png"
import fileIcon from "../files/fileIcon.jpg"
import upArrow from "../files/upArrow.png"

function KebabStorageView(props) {

    return (
        <div style={{ display: "flex", flexDirection: "row", position: "absolute", bottom: "0px", top: "60px", left: "0px", right: "0px" }}>
            <div style={{ flexDirection: "column", flex: "3" }}>
                {props.path == "/" ? ""
                    :
                    <div onClick={() => { props.subPath(); props.setSelectedFile(null) }} style={{ height: "50px", backgroundColor: "rgb(250, 218, 77)", marginTop: "15px", textAlign: "left", display: "flex", flexDirection: "row", cursor: "pointer" }}>
                        <img src={upArrow} height={"40px"} style={{ marginLeft: "10px", marginTop: "5px", userSelect: "none" }} />
                    </div>}
                {props.list.map((item) => {
                    return (
                        item.toString().includes(".") ?
                            <div style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}>
                                <div onClick={() => props.setSelectedFile(item.toString())} key={item} style={{ flex: "1", height: "50px", backgroundColor: "rgb(250, 218, 77)", marginTop: "15px", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "row" }}>
                                    <img style={{ marginLeft: "10px", marginTop: "10px", marginRight: "15px", userSelect: "none" }} src={fileIcon} height={"35px"} onClick={() => props.getFile(item.toString())} />
                                    <h2 style={{ whiteSpace: "nowrap", marginTop: "10px", userSelect: "none" }}>{item.toString()}</h2>
                                </div>
                                <div style={{ width: "30px", height: "50px", backgroundColor: "rgb(250, 218, 77)", marginTop: "15px" }}>
                                    <img onClick={() => { props.remFile(item.toString()); props.setSelectedFile(null) }} height="20px" src={trashIcon} style={{ marginRight: "0px", marginLeft: "auto", marginTop: "16px", userSelect: "none" }} />
                                </div>
                            </div>
                            :
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div onClick={() => { props.setSelectedFile(null); props.addPath(item.toString()) }} key={item} style={{ flex: "1", height: "50px", backgroundColor: "rgb(250, 218, 77)", marginTop: "15px", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "row" }}>
                                    <img style={{ marginLeft: "10px", marginTop: "10px", marginRight: "15px", userSelect: "none" }} src={folderIcon} height={"35px"} onClick={() => props.getFile(item.toString())} />
                                    <h2 style={{ whiteSpace: "nowrap", marginTop: "10px", userSelect: "none" }}>{item.toString()}</h2>
                                </div>
                                <div style={{ width: "30px", height: "50px", backgroundColor: "rgb(250, 218, 77)", cursor: "pointer", marginTop: "15px" }}>
                                    <img onClick={() => props.remFolder(item.toString())} height="20px" src={trashIcon} style={{ marginRight: "0px", marginLeft: "auto", marginTop: "16px", userSelect: "none" }} />
                                </div>
                            </div>
                    )
                })}
                {props.list.length === 0 ? <h2>This Directory Is Empty</h2> : ""}
            </div>
            <div style={{ flex: "1", border: "1px lightgrey solid", float: "right", minWidth: "500px", margin: "15px", padding: "10px" }}>
                <h3 style={{ wordWrap: "break-word" }}>{props.path}</h3>
                <input id="fileUploader" type="file" onChange={(e) => props.fileUpload(e.target.files[0])} style={{ display: "none" }} />
                <label for="fileUploader" style={{ border: "1px grey solid", padding: "10px", userSelect: "none" }}>Click to upload a file here</label>
                <br />
                <input id="folderInput" type="text" style={{ marginTop: "20px", height: "40px", width: "162px" }} placeholder="Create a folder here..." onKeyPress={event => { if (event.key === 'Enter') { props.createFolder() } }} />
                <button onClick={() => props.createFolder()} style={{ height: "40px", width: "40px" }}>+</button>
                <div style={{ marginTop: "80px", textAlign: "center" }}>
                    {props.selectedFile ?
                        <div>
                            <h2>{props.selectedFile}</h2>
                            <div style={{ flexDirection: "row", alignContent: "center" }}>
                                <img onClick={() => props.getFile(props.selectedFile)} height={"50px"} src={downloadIcon} style={{ margin: "30px", cursor: "pointer", userSelect: "none" }} />
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