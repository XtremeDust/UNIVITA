"use client"
import React from "react"

export interface contentModalProps{
    children?: React.ReactNode;
    className?:string;
}

    export function ContentModal({children,className,...props}:contentModalProps){               
        return(
            <div className={` flex flex-col overflow-hidden place-content-center size-[42rem] bg-gray-100 rounded-2xl p-5 text-center  ${className}`} onClick={(e) => e.stopPropagation()} {...props}>
                {children}
            </div>
        )
    }export default ContentModal