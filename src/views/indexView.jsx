import React from 'react';
import "../styles/indexView.css";
import kebabStorageLogo from "../files/kebabStorageLogo.png"
import kebabTyperLogo from "../files/kebabTyperLogo.png"

function IndexView(props) {
    return (
        <div className='IndexContainer'>
            <div className='Tile' style={{ backgroundColor: "rgb(240, 208, 65)" }} onClick={() => props.navigate("/project-kebab/kebabstorage/")}>
                <a className="TileText" style={{ color: "black" }}>KEBAB STORAGE</a>
                <img className='TileImage' src={kebabStorageLogo} />
            </div>
            <div className='Tile' style={{ backgroundColor: "rgb(120,180,250)" }} >
                <a className="TileText" style={{ color: "black" }}>KEBAB TYPER</a>
                <img className='TileImage' src={kebabTyperLogo} />
            </div>
            <div className='Tile' style={{ backgroundColor: "rgb(250,120,120)" }}>
                <a className="TileText" style={{ color: "black" }}>KEBAB PDF</a>
                <img className='TileImage' src={kebabTyperLogo} />
            </div>
            <div className='Tile' style={{ backgroundColor: "rgb(44,44,60)" }}>
                <a className="TileText" style={{ color: "white" }}>KEBAB DATABASE</a>
                <img className='TileImage' src={kebabTyperLogo} />
            </div>

        </div>
    )
}

export default IndexView;