"use client"
import React, {useState} from "react";
import {featS} from "@/types/feactures";

 export default function featuresS(){

    const [isHoverS, setHoverS] = useState<number|null>(null);
        const HoverS = (index:number)=>{setHoverS(isHoverS => isHoverS===index ? null : index)};

    return(
        <div className=" p-3 text-black">
            <div className=" text-[20px] md:text-3xl font-medium flex flex-col gap-1">
                <h2 className="lg:text-4xl font-mono">Vive la Nueva Experiencia del Deporte</h2>
                <span className="ml-5 text-justify">Algo colocare despues</span>
            </div>
            <div className="flex flex-wrap justify-evenly gap-5 p-3 mt-5 group">
                {featS.map((events, index)=>(
                    <a key={events.id} href={events.src} className="h-48 w-full md:w-11/12 lg:w-5/12 xl:w-2/8 rounded-2xl flex flex-col gap-1 place-content-center p-[3px] transition-all  duration-500 group-hover:opacity-50 hover:!opacity-100  hover:scale-105  place-items-center overflow-hidden relative "
                        onMouseEnter={()=>HoverS(index)} onMouseLeave={()=>HoverS(index)}>

                        <div className="hover:bg-unimar hover:text-white bg-gray-100 w-full h-full p-3 rounded-2xl flex flex-col gap-1 place-content-center
                            ring-unimar ring-2 hover:ring-0 transition-all z-10">                                
                            <img src={events.img} alt={events.title} /> 
                            <h3 className="text-[22px] font-bold">{events.title}</h3>                        
                                <p className="ml-1.5">{events.text}</p>
                        </div>

                        <div className={` ${isHoverS===index ? 'animate-spin-gradient absolute inset-0 ':' pointer-events-none'}`}/>
                    </a>
                ))}
            </div>
        </div>
    );
 }