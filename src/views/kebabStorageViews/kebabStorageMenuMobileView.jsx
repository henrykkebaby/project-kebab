import React from 'react';
import "../../styles/kebabStorageViews/kebabStorageMenuView.css"
import uploadIcon from "../../files/uploadIcon.jpg"
import spinnerIcon from "../../files/spinnerIcon.jpg"
import refreshIcon from "../../files/refreshIcon.png"
import addFolderIcon from "../../files/addFolderIcon.png"

function KebabStorageMenuView(props) {
    return (
        <div style={{ position: "fixed", bottom: "0cm", left: "0cm", right: "0cm", height: "1.5cm", backgroundColor: "rgb(245, 245, 245)", borderTop: "2px solid black" }}>

            {(props.isLoading || props.isListLoading) ? <img src={spinnerIcon} style={{ height: "1.5cm", marginLeft: "50%", transform: "translate(-50%, 0)" }} /> :
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <input id="fileUploader" type="file" multiple="multiple" onChange={(e) => props.fileUpload(e.target.files)} style={{ display: "none" }} />
                    <label htmlFor="fileUploader" > <img src={uploadIcon} style={{ height: "1.3cm", marginTop: "0.1cm" }} /></label>
                    <img onClick={() => props.getDir(props.path)} src={refreshIcon} style={{ height: "1.3cm", marginTop: "0.1cm" }} />
                    <img onClick={() => { props.setIsCreatingFolder(true); }} src={addFolderIcon} style={{ height: "1.3cm", marginTop: "0.1cm" }} />
                </div>
            }
        </div>
    )
}

export default KebabStorageMenuView;


