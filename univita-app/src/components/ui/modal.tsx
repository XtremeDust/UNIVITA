"use client"
import React, {useState} from "react"

export interface ModalProps{
    children?: React.ReactNode;
    open?: boolean;
    onClose?: () => void;
    className?:string;
}

    export function Modal({children,className,open,...props}:ModalProps){               
        return(
                <div className={`  fixed inset-0 place-content-center place-items-center backdrop-blur-3xl  backdrop-grayscale-75 z-30 transition-opacity duration-300 ${className}`} {...props}>
                    {children}
                </div>
        )
    }export default Modal