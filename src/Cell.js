import React, {useState} from "react";
import './css/cell.css';

function Cell(props){

    let [state, setState] = useState(null)
    

    function click(){
        if (!state) {
            setState(props.actualState)
            props.changePlayer()
        }
    }

    return(
        <div className={`cell`}  onClick={()=>click()}>
            {state=='cross' && 
                <div className="piece">
                    <div className="cross_stick cross_1"></div>
                    <div className="cross_stick cross_2"></div>
                </div>

            }
            {state=='circle' && 
                <div className="piece">
                    <div className="main_circle"></div>
                    <div className="second_circle"></div>
                    <div className="animation_circle"></div>
                </div>
            }

        </div>
    )
}

export default Cell;