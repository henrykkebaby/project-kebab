import React from 'react';
import IndexView from '../views/indexView';
import { useNavigate } from "react-router-dom";

function IndexPresenter(props) {
    
    const navigate = useNavigate();

    return (
        <IndexView 
            navigate={navigate}
        />
    )
}

export default IndexPresenter;