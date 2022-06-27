import React, {useState} from "react";
import PieceCross from "../pieces/cross/PieceCross";
import PieceCircle from "../pieces/circle/PieceCircle";
import './resume.css';

function Resume(props){
    const history = props.history;

    return(
        <div className="resume_wrapper">
            <div className="resume_player">
                <div className="resume_piece">
                    <PieceCross />
                </div>
                <div className="resume_points">{history.cross}</div>
            </div>
            <div className="resume_player">
                <div className="resume_piece">
                    <PieceCircle color="white" />
                </div>
                <div className="resume_points">{history.circle}</div>
            </div>
        </div>
    )
}

export default Resume;