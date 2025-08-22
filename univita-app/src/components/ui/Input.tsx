import React from "react";

interface IntProps extends React.InputHTMLAttributes<HTMLInputElement>{}

export function Input ({...props}:IntProps){
    return(
        <input className="" {...props}/>        
    )
}