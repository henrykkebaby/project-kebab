import React from 'react';
import "../styles/styles.css"

function IndexView(props) {
    return (
        <div className='Tiles'>
            <div onClick={() => props.navigate("/project-kebab/kebabstorage/")} className='Tile' style={{ backgroundColor: "rgb(240, 208, 65)" }}>
                <a style={{ color: "black" }} className="TileText">KEBAB STORAGE</a>
                <img height="150px" src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png' />
            </div>
            <div className='Tile' style={{ backgroundColor: "rgb(120,180,250)" }}>
                <a style={{ color: "black" }} className="TileText">KEBAB TYPER</a>
                <a style={{ color: "red" }} className="TileText">COMING SOON</a>
            </div>
            <div className='Tile' style={{ backgroundColor: "rgb(250,120,120)" }}>
                <a style={{ color: "black" }} className="TileText">KEBAB PDF</a>
                <a style={{ color: "red" }} className="TileText">COMING SOON</a>
            </div>
            <div className='Tile' style={{ backgroundColor: "rgb(44,44,60)" }}>
                <a style={{ color: "white" }} className="TileText">KEBAB CODE</a>
                <a style={{ color: "red" }} className="TileText">COMING SOON</a>
            </div>

        </div>
    )
}

export default IndexView;