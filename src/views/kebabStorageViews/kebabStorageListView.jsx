import React from 'react';
import "../../styles/kebabStorageViews/kebabStorageListView.css"
import folderIcon from "../../files/folderIcon.png"
import fileIcon from "../../files/fileIcon.jpg"
import upArrow from "../../files/upArrow.png"
import spinnerIcon from "../../files/spinnerIcon.jpg"

function KebabStorageListView(props) {
    return (
        <div className='KebabStorageListViewContainer'>

            {(props.path === "/" || props.isListLoading) ? "" :
                <div className='KebabStorageListItem' onClick={() => { props.subPath(); props.setSelectedFile(null) }}>
                    <img className='KebabStorageListImage' src={upArrow} height={"40px"} />
                </div>
            }

            {props.isListLoading ?

                <img src={spinnerIcon} height={"150px"} style={{ userSelect: "none", margin: "30px" }} />

                :

                props.list.map((item) => {

                    return <div className='KebabStorageListItem' onClick={() => props.handleClick(item.toString())} onDoubleClick={() => props.handleDoubleClick(item.toString())} key={item}>

                        {item.toString().includes(".") ?
                            <img className='KebabStorageListImage' src={fileIcon} height={"35px"} onClick={() => props.getFile(item.toString())} />
                            :
                            <img className='KebabStorageListImage' src={folderIcon} height={"35px"} onClick={() => props.getFile(item.toString())} />
                        }

                        <h2 className='KebabStorageListText'>{item.toString()}</h2>
                    </div>
                })

            }
            {!props.isListLoading && props.list.length === 0 ? <h2 className='KebabStorageListText'>This Directory Is Empty</h2> : ""}
        </div >
    )
}

export default KebabStorageListView;