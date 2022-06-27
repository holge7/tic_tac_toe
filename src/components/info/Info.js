import React from "react";

export default function Info(props){
    return (
        <h2 className={props.class}>
            {props.msg}
        </h2>
    )
}