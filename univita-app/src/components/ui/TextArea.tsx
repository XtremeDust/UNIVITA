import React from "react";

interface textAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function TextArea ({className,...props}:textAreaProps){
    return(
        <textarea name="comentarios" id="" placeholder="coment" className={`bg-white rounded-md ${className}`} {...props}/>
    )
}