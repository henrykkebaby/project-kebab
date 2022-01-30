import React from 'react';
import "../styles/indexView.css";
import kebabStorageLogo from "../files/kebabStorageLogo.png"
import kebabDatabaseLogo from "../files/kebabDatabaseLogo.png"

function IndexView(props) {

    return (
        <div className='IndexContainer'>
            <div className='Tile' style={{ backgroundColor: "rgb(240, 208, 65)" }} onClick={() => props.navigate("/project-kebab/kebabstorage/")}>
                <a className="TileText" style={{ color: "black" }}>KEBAB STORAGE</a>
                <img className='TileImage' src={kebabStorageLogo} />
            </div>
            {/*}
            <div className='Tile' style={{ backgroundColor: "rgb(54,54,70)" }} onClick={() => props.navigate("/project-kebab/kebabdatabase/")}>
                <a className="TileText" style={{ color: "white" }}>KEBAB DATABASE</a>
                <img className='TileImage' src={kebabDatabaseLogo} />
            </div>
        {*/}
            <div className='Tile' style={{ backgroundColor: "rgb(220,220,220)" }} onClick={() => props.navigate("/project-kebab/admin/")}>
                <a className="TileText" style={{ color: "white" }}>ADMIN PAGES</a>
            </div>

        </div >
    )
}

export default IndexView;