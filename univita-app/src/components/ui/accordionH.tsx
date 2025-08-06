'use client'
import React, { useState } from "react";
import {sectionH} from "@/data/headerSection";
import Image from "next/image";

function Accordeon (){

    const [isOpen, setOpen] = useState<number|null>(null);
    const StatePanel = (index:number)=>{setOpen(isOpen => isOpen===index ? null : index)};

    const [isSubOpen, setSubOpen]  = useState<number|null>(null);
    const SubStatePanel = (i:number)=>{setSubOpen(isSubOpen => isSubOpen===i ? null : i)};

    const [isSub_MenuOpen, setSub_MenuOpen]  = useState<number|null>(null);
    const Sub_MenuStatePanel = (x:number)=>{setSub_MenuOpen(isSub_MenuOpen => isSub_MenuOpen===x ? null : x)};

    return(
        <div>   
            {sectionH.map((menu, index)=>(
                <div key={menu.id} className={` grid grid-flow-row p-2 px-7 ${isOpen===index ? 'text-black ' :'text-gray-500'}`}>
                    {/*principal*/}
                       <a href={menu.url} className="w-screen cursor-pointer grid grid-flow-col justify-start items-center hover:text-black"
                        onClick={( menu.img==="#"?() => StatePanel(index):()=>(null))}
                        >
                            {menu.title}                             
                                {( menu.img==="#") &&(
                                    <Image
                                        className="dark:invert rotate-180 p-1"
                                        src="vercel.svg"
                                        alt={menu.title}
                                        width={14}
                                        height={14}
                                        priority
                                        />                                         
                                )}
                        </a>

                      {/*secundario*/}                            
                            {menu.subsectionH?.map((sub,i)=>(    
                             <ul key={sub.id} className={` transition-all ease-in-out overflow-hidden md:hidden ${isOpen===index ? ' max-h-screen opacity-100 text-black ' :' max-h-0 opacity-0  text-gray-500 pointer-events-none'}`}>                            
                                <li className="w-2xl ml-3">
                                    <a href={sub.url} className={`grid w-2xl p-2 grid-flow-col justify-start items-center hover:text-black hover:bg-gray-50  ${isSubOpen===i ? 'text-black bg-gray-50 ' :'text-gray-500'}`}
                                     onClick={( sub.img==="#"?() => SubStatePanel(i):()=>(null))}
                                    >
                                        {sub.title}
                                        {( sub.img==="#") &&(
                                            <Image
                                                className="dark:invert rotate-180 p-1"
                                                src="vercel.svg"
                                                alt={sub.title}
                                                width={14}
                                                height={14}
                                                priority
                                                />                                         
                                        )}
                                    </a>

                                    {/*sub secudario*/}
                                    
                                        <ul className={`p-1 transition-all ease-in-out overflow-hidden md:hidden text-gray-500 ${isSubOpen===i ? ' max-h-screen opacity-100 text-black ' :' max-h-0 opacity-0  pointer-events-none'}`}>
                                            <div className=" shadow-2xl rounded-b-2xl ">

                                            {sub.subsectionH?.map((sub_menu,x)=>(                                
                                                <li key={sub_menu.id} className=" ml-3">
                                                    <a href={sub_menu.url} className={`grid rounded-2xs p-2 grid-flow-col justify-start items-center hover:text-black hover:bg-gray-50  ${isSub_MenuOpen===x ? 'text-black bg-gray-50 ' :'text-gray-500'}`}
                                                     onClick={( sub_menu.img==="#"?() => Sub_MenuStatePanel(x):()=>(null))}
                                                    >
                                                        {sub_menu.title}
                                                        {( sub_menu.img==="#") &&(
                                                            <Image
                                                                className="dark:invert rotate-180 p-1"
                                                                src="vercel.svg"
                                                                alt={sub_menu.title}
                                                                width={14}
                                                                height={14}
                                                                priority
                                                            />                                         
                                                        )}
                                                    </a>

                                                     {/*Academico*/}
                                                        <ul className={`p-1 transition-all ease-in-out overflow-hidden md:hidden text-gray-500 ${isSub_MenuOpen===x ? ' max-h-screen opacity-100 text-black ' :' max-h-0 opacity-0  pointer-events-none'}`}>
                                                            <div className="p-2 shadow-2xl rounded-b-2xl ">

                                                            {sub_menu.subsectionH?.map((sub_submenu)=>(                                
                                                                <li key={sub_submenu.id} className=" ml-3 p-2 hover:text-black hover:bg-gray-50 ">
                                                                    <a href={sub_submenu.url} className="grid  grid-flow-col justify-start items-center">
                                                                        {sub_submenu.title}                                                                       
                                                                    </a>                                            
                                                                </li>
                                                            ))} 
                                                            </div>
                                                        </ul>
                                                </li>
                                            ))} 
                                            </div>
                                        </ul>   

                                </li>
                             </ul>
                            ))} 
                </div>
            ))}         
        </div>
    );
}

export default Accordeon