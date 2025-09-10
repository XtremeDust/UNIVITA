import React from "react";

interface CardImgProps{
    children:React.ReactNode;
}

export function CardImg({children, ...props}:CardImgProps){
    return(
        <div className="bg-gray-400 rounded-full" {...props}
        >
            {children}
        </div>
    )
} export default CardImg