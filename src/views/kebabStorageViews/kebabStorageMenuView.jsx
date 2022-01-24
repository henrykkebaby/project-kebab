import React from 'react';
import "../../styles/styles.css";
import downloadIcon from "../../files/downloadIcon.png"
import trashIcon from "../../files/trashIcon.png"
import openFileIcon from "../../files/openFileIcon.png"
import spinnerIcon from "../../files/spinnerIcon.jpg"

function KebabStorageMenuView(props) {
    return (
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
                            {props.isLoading ? <img src={spinnerIcon} height={"100px"} /> :
                                <div>
                                    <img onClick={() => props.openFile(props.selectedFile)} height={"50px"} src={openFileIcon} style={{ margin: "30px", cursor: "pointer", userSelect: "none" }} />
                                    {props.selectedFile.includes(".") ? <img onClick={() => props.getFile(props.selectedFile)} height={"50px"} src={downloadIcon} style={{ margin: "30px", cursor: "pointer", userSelect: "none" }} /> : ""}
                                    <img onClick={() => { props.remFile(props.selectedFile); props.setSelectedFile(null) }} height={"50px"} src={trashIcon} style={{ margin: "30px", cursor: "pointer", userSelect: "none" }} />
                                </div>
                            }
                        </div>
                    </div>
                    :
                    <h2 style={{ userSelect: "none" }}>Nothing selected</h2>
                }
            </div>
        </div>
    )
}

export default KebabStorageMenuView;


