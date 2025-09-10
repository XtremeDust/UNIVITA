import React from "react";

interface CardProps{
    children:React.ReactNode;
    className?:string;
}

export function Card({children, className, ...props}:CardProps) {
  return (
    <div className={`Card flex flex-row place-content-center items-center h-[16rem] w-sm sm:w-9/12 md:w-5/11 xl:w-[18rem]  2xl:w-[21rem]  rounded-2xl group ${className}`} {...props}
    >
            {children}
    </div>
  )
} export default Card
