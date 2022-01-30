import React from 'react';
import "../../styles/kebabStorageViews/kebabStorageListView.css"
import folderIcon from "../../files/folderIcon.png"
import fileIcon from "../../files/fileIcon.jpg"
import upArrow from "../../files/upArrow.png"
import spinnerIcon from "../../files/spinnerIcon.jpg"
import trashIcon from "../../files/trashIcon.png"

function KebabStorageListView(props) {
    return (
        <div className='KebabStorageListViewContainer'>

            {!(props.path === "/" || props.isListLoading) &&
                <div className='KebabStorageListItem' onClick={() => { props.subPath(); props.setSelectedFile(null) }}>
                    <img className='KebabStorageListImage' src={upArrow} />
                </div>
            }

            {props.isListLoading ?

                !props.isMobile && <img src={spinnerIcon} height={"150px"} style={{ marginLeft: "50%", transform: "translate(-50%, 0)", userSelect: "none", marginTop: "30px" }} />

                :

                props.list.map((item) => {

                    return <div className='KebabStorageListItem' onClick={(e) => props.handleClick(item.toString(), e)} onDoubleClick={(e) => props.handleDoubleClick(item.toString(), e)} onTouchStart={(e) => props.handleTouchStart(item.toString(), e)} onTouchEnd={(e) => props.handleTouchEnd(e)} onTouchMove={() => { props.handleTouchMove() }} key={item}>

                        {item.toString().includes(".") ?
                            <img className='KebabStorageListImage' src={fileIcon} />
                            :
                            <img className='KebabStorageListImage' src={folderIcon} />
                        }

                        <h2 className='KebabStorageListText'>{item.toString()}</h2>
                        {props.isMobile && <img className='KebabStorageListImage' onClick={(e) => { props.remFile(item.toString()); e.stopPropagation(); }} src={trashIcon} style={{ marginLeft: "auto", marginRight: "0.1cm" }} />}
                    </div>
                })

            }
            {(!props.isListLoading && props.list.length === 0) && <h2 className='KebabStorageListText' style={{ textAlign: "center" }}>This Directory Is Empty</h2>}
            <div style={{ height: "4cm" }}></div>
        </div >
    )
}

export default KebabStorageListView;