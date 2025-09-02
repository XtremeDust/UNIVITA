import React from "react";

interface CardProps{
    children:React.ReactNode;
    className?:string;
}

export function Card({children, className, ...props}:CardProps) {
  return (
    <div className={`Card flex flex-row place-content-center items-center h-[16rem] w-sm sm:w-11/12 xl:w-5/11 2xl:w-[25rem]  rounded-2xl group ${className}`} {...props}
    >
            {children}
    </div>
  )
} export default Card
