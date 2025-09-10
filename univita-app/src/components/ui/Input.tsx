import React from "react";

interface IntProps extends React.InputHTMLAttributes<HTMLInputElement>{}

export function Input ({className,...props}:IntProps){
    return(
        <input className={`text-[20px]  bg-white rounded-md ${className}`} {...props}/>        
    )
}