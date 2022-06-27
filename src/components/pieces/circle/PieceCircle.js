import React from "react";
import './circle.css';

function PieceCircle(props){
    return(
        <div className="piece">
            <div className="main_circle"></div>
            <div style={{backgroundColor: props.color}} className={`second_circle second_circle-${props.color}`}></div>
            <div style={{backgroundColor: props.color}} className={`animation_circle animation_circle-${props.color}`}></div>
        </div>
    )
}

export default PieceCircle;