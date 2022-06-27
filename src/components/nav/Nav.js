import React from "react";
import Resume from "../resume/Resume";

function Nav(props){
    return(
        <div id="nav">
            <Resume history={props.history} />
        </div>
    )
}

export default Nav;